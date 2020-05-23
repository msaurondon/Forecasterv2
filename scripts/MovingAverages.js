{

function createSMA(jsonObj, timeframe, averageType){
  let counter = 0;
  let sum = 0;
  let sma = 0;
  let today = new Date();
  let transactionDate = today;

  for(x in jsonObj){
    transactionDate = Object.keys(jsonObj)[counter];
    if(counter < timeframe){
      sum += fetchAverageData(parseFloat(jsonObj[transactionDate]),averageType);
      counter++;
    }
  }

  sma = parseFloat(sum) / parseInt(timeframe);
  return sma;
}

function fetchAverageData(jsonObj, type){
  switch(type){
    case "close":
      return parseFloat(jsonObj["4. close"]);
      break;
    default:
      return parseFloat(jsonObj["4. close"]);
      break;
  }
}

}
