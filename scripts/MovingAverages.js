export function createSMA(jsonObj, timeframe, averageType){
  let counter = 1;
  let sum = 0;
  let sma = 0;
  let today = new Date();
  let transactionDate = today;

  try{
    for(var x in jsonObj){
      transactionDate = Object.keys(jsonObj)[counter];
      if(counter <= timeframe){
        sum += fetchAverageData(jsonObj[transactionDate],averageType);
        counter++;
      }
      else {
        break;
      }
    }
  }
  catch(err){
    console.log("createSMA: "+err);
  }

  sma = parseFloat(sum) / parseInt(timeframe);
  return sma;
}

function fetchAverageData(jsonData, type){
  let returnValue = 0.0;
  switch(type){
    case "close":
      returnValue = jsonData["4. close"];
      break;
    case "hl2":
      returnValue = (jsonData["2. high"] + jsonData["3. low"]) / 2;
      break;
    case "range":
      returnValue = jsonData["2. high"] - jsonData["3. low"];
      console.log(returnValue);
      break;
    case "volume":
      returnValue = jsonData["5. volume"];
      break;
    default:
      returnValue = jsonData["4. close"];
      break;
  }

  return parseFloat(returnValue);
}
