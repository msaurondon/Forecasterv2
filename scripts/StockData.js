import {createSMA} from '/scripts/MovingAverages.js'
import {setTrend} from '/scripts/trend.js'

export function createStockData(jsonStockData){
  setLastPrice(jsonStockData);
  setTrendMovingAverage(jsonStockData);
  setATR(jsonStockData);
  setAVR(jsonStockData);
  setOnePercentAVR();
}

function setLastPrice(jsonStockData){
  //let counter = 0;
  //let dateKey = Object.keys(jsonStockData)[counter];
  let close = getSingleValue(jsonStockData,"close");//jsonStockData[dateKey]["4. close"];
  let p = document.getElementById("s4");
  p.innerHTML = parseFloat(close).toFixed(2);
}

function setTrendMovingAverage(jsonStockData){
  let sma21 = createSMA(jsonStockData, 21, "close");
  let close = getSingleValue(jsonStockData, "close");
  let trendValue = setTrend(sma21, close);
  let trendAttitude = trendValue === 1 ? "Bull" : "Bear";

  let p = document.getElementById("s5");
  p.innerHTML = trendAttitude;
}

function setATR(jsonStockData){
  let atr = createSMA(jsonStockData, 21, "range");
  let p = document.getElementById("s6");
  p.innerHTML = parseFloat(atr).toFixed(2);
}

function setAVR(jsonStockData){
  let avr = createSMA(jsonStockData, 21, "volume");
  let p = document.getElementById("s7");
  p.innerHTML = parseInt(avr);
}

function setOnePercentAVR(){
  let avr = document.getElementById("s7").innerHTML;
  let p = document.getElementById("s8");
  let onePercentAVR = parseInt(avr) * .01;
  p.innerHTML = parseInt(onePercentAVR);
}

function getSingleValue(jsonStockData, valueType){
  let counter = 0;
  let dateKey = Object.keys(jsonStockData)[counter];
  let returnValue = 0.0;
  switch(valueType){
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
