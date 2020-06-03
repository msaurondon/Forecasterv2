import {constructMetaData} from '/scripts/MetaData.js'
import {createStockData} from '/scripts/StockData.js'


export function loadData(symbol,checked){
  fetchData(symbol,checked);
}

function splitData(data){
  let metaData = data["Meta Data"];
  console.log(Object.keys(data)[1]);
  let timeSeries = Object.keys(data)[1] === "Time Series (Daily)" ? data["Time Series (Daily)"] : data["Weekly Time Series"];
  constructMetaData(metaData);
  createStockData(timeSeries);
}

function displayError(err){

}

async function fetchData(symbol,checked){
  //'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983'
  //'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983'
  //'IBM.json'
  var url = checked ?
    'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983' :
    'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983';

  await fetch(url)
    .then(response => response.json())
    .then(json => splitData(json))
    .catch(displayError);
}
