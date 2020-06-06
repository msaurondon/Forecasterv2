var highestHigh;
var lowestLow;
 // 10 days not including current;

export function setConsolidation(jsonObj, messageIn){
  var message = messageIn;


  try{
    parseData(jsonObj);
    message.HighestHigh = Number(highestHigh);
    message.LowestLow = Number(lowestLow);
  }
  catch(err){
    console.log(err);
  }

  return message;
}

//   atrStop = dailyAttitude <= .5 ? (close - (atr * 1.5)) : (close + (atr * 1.5));

//   document.getElementById("s14").innerHTML = atrStop;
//
// }





function parseData(jsonObj){
  let barsBack = 10;
  let transactionDate = jsonObj[Object.keys(jsonObj)[0]];
  let lastTradeDate = jsonObj[Object.keys(jsonObj)[0]];
  highestHigh = 0.0;
  lowestLow = 0.0;
  try{
    while(barsBack >= 0)
    {
      transactionDate = Object.keys(jsonObj)[barsBack];
      console.log(transactionDate);
      fetchBoundaries(jsonObj[transactionDate]);
      if (barsBack === 0 ){ boundaryCleanUp(jsonObj[transactionDate]);}
      barsBack--;
    }
    boundaryCleanUp

  }
  catch(err){
    console.log("parseData: "+err);
  }
}

function fetchBoundaries(jsonData){
  let high = jsonData["2. high"];
  let low = jsonData["3. low"];
  let close = jsonData["4. close"];
  newBoundaries(high, low, close);
  higher(high, low, close);
  lower(high, low, close);
  boundaryCleanUp(high, low);


}

function boundaryCleanUp(jsonData){
  let high = jsonData["2. high"];
  let low = jsonData["3. low"];

    if(highestHigh === high && lowestLow === low){
      highestHigh = 0.0;
      lowestLow = 0.0;
    }

}


function newBoundaries(high, low, close){
  highestHigh = close < lowestLow ? high : highestHigh;
  lowestLow = close > highestHigh ? low : lowestLow;
}

function higher(high, low, close){

  highestHigh = close > highestHigh ? high :
    highestHigh > high ? highestHigh : high;
}

function lower(high, low, close){

  lowestLow = lowestLow === 0 ? low: //lowestLow;
              lowestLow > low ? low : //lowestLow
              lowestLow  > close ? low : lowestLow;
}
