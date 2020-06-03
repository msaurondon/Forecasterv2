import {
  createSMA
} from '/scripts/MovingAverages.js'
import {
  setTrend
} from '/scripts/trend.js'
import {
  setConsolidation
} from '/scripts/Consolidation.js'

let message = {
  LastPrice: 0.0,
  TrendMA: 0.0,
  Trend: "",
  ATR: 0.0,
  AVR: 0.0,
  AVR1: 0.0,
  Gain : 0.0,
  TimePeriod : 0,
  HighestHigh : 0,
  LowestLow : 0,
  High : 0,
  Low : 0,
  Target: 0.0,
  Projection: 0.0,
  atrStop : function() {
    return trend === "Bull" ? message.LastPrice - (message.ATR * 1.5) : message.LastPrice + (message.ATR * 1.5);
  },
  Consolidation : function(){
    if (message.HighestHigh >= message.LastPrice && message.LastPrice >= message.LowestLow)
    {
       return true;
    }
    else{
        return false;
    }
  },
  InConsolidation: function(){
      if (message.Consolidation())
      {
         return parseFloat(message.LowestLow).toFixed(2) + " - " + parseFloat(message.HighestHigh).toFixed(2);
      }
      else{
          return "Not in consolidation";
      }
  },
  DailyRange : function(){

    return Number(message.High - message.Low);
  },
  DailyAttitude: function(){

    return Number((message.High - message.LastPrice)/message.DailyRange());
  },
  Multiplier: function(){

      var multiplier = 0.0;
      var consol = message.Consolidation();

      try{
        if(message.Trend === "Bull"){
          if(message.DailyAttitude() <= .5){

              multiplier = consol ? .618 : 1.618;
          }
          else {
            multiplier = consol ? .382 : .618;
          }
        }
        else // bearRange
        {

          if(message.DailyAttitude() <= .5)
          {

            multiplier = consol ? .382 : .618;
          }
          else {

            multiplier = consol ? .618 : 1.618;

          }

        }
      }catch(err)
      {
        console.log(err);
      }

      return multiplier;
  },
  TargetPrice : function(){
    var target = 0.0;
    try{
      message.Projection = message.ATR * message.Multiplier();
      target = message.Trend == "Bull" ? Number(message.LastPrice) + message.Projection : Number(message.LastPrice) - message.Projection;
    }
    catch(err){
      console.log(err);
    }

    message.Target = Number(target);
  },
  Gain : function(){
    return ((message.Target/message.LastPrice)-1)*100;
  },
  TradeLength : function(){
    var dayOrWeek = document.getElementById("sliderSwitch").checked ? "Weeks" : "Periods";
    var distance = message.Trend == "Bull" ? message.Target - message.TrendMA : message.TrendMA - message.Target;
    var timePeriod = Math.round(distance / message.ATR);
    var timePeriod2 = timePeriod * 2
    return timePeriod + " - " + timePeriod2 + " Trading "+ dayOrWeek;
  },
  post: function() {

    document.getElementById("s4").innerHTML = parseFloat(message.LastPrice).toFixed(2);
    document.getElementById("s5").innerHTML = message.Trend;
    document.getElementById("s6").innerHTML = parseFloat(message.ATR).toFixed(2);
    document.getElementById("s7").innerHTML = parseInt(message.AVR);
    document.getElementById("s8").innerHTML = parseInt(message.AVR1);
    document.getElementById("s9").innerHTML = message.InConsolidation();
    message.TargetPrice();
    document.getElementById("s10").innerHTML = parseFloat(message.Target).toFixed(2);
    document.getElementById("s11").innerHTML = message.Gain().toFixed(2) + " %";
    document.getElementById("s12").innerHTML = message.TradeLength();
  }

};

export function createStockData(jsonStockData) {
  let msg = message;
  try{
    setLastPrice(jsonStockData);
    setTrendMovingAverage(jsonStockData);
    setATR(jsonStockData);
    setAVR(jsonStockData);
    setOnePercentAVR();
    msg.High = getSingleValue(jsonStockData,"high");
    msg.Low = getSingleValue(jsonStockData,"low");
    msg = setConsolidation(jsonStockData, message);
  }
  catch(err){
    console.log(err);
  }

  console.log(msg);
  msg.post();

}

function setLastPrice(jsonStockData) {
  //let counter = 0;
  //let dateKey = Object.keys(jsonStockData)[counter];
  let close = getSingleValue(jsonStockData, "close"); //jsonStockData[dateKey]["4. close"];
  message.LastPrice = close;
}

function setTrendMovingAverage(jsonStockData) {
  message.TrendMA = createSMA(jsonStockData, 21, "close");
  message.Trend = message.TrendMA < message.LastPrice ? "Bull" : "Bear";
}

function setATR(jsonStockData) {
  message.ATR = createSMA(jsonStockData, 21, "range");
}

function setAVR(jsonStockData) {
  message.AVR = createSMA(jsonStockData, 21, "volume");

}

function setOnePercentAVR() {


  message.AVR1 = parseInt(message.AVR) * .01;


}

function getSingleValue(jsonStockData, valueType) {
  let counter = 0;
  let dateKey = Object.keys(jsonStockData)[counter];
  let returnValue = 0.0;
  switch (valueType) {
    case "close":
      returnValue = jsonStockData[dateKey]["4. close"];
      break;
    case "high":
      returnValue = jsonStockData[dateKey]["2. high"];
      break;
    case "low":
      returnValue = jsonStockData[dateKey]["3. low"];
      break;
    case "open":
      returnValue = jsonStockData[dateKey]["1. open"];
      break;
    case "volume":
      returnValue = jsonStockData[dataKey]["5. volume"];
      break;
    default:
      returnValue = jsonStockData[dateKey]["4. close"];
      break;
  }

  return parseFloat(returnValue);

}
