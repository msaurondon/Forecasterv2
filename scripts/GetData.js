import {constructMetaData} from '/scripts/MetaData.js'
import {createStockData} from '/scripts/StockData.js'


export function loadData(){
  fetchData();
}

function splitData(data){
  let metaData = data["Meta Data"];
  let timeSeries = data["Time Series (Daily)"];
  constructMetaData(metaData);
  createStockData(timeSeries);
}

function displayError(err){

}

async function fetchData(){
  await fetch('IBM.json')
    .then(response => response.json())
    .then(json => splitData(json))
    .catch(displayError);
}
