export function loadData(symbol,checked){
  fetchData(symbol,checked);
}

function splitData(data,checked){
  let metaData = data["Meta Data"];
  console.log(Object.keys(data)[1]);
  let timeSeries = data["Technical Analysis: SAR"];
  createStockData(timeSeries,checked);
}

function displayError(err){

}

async function fetchData(symbol,checked){
  //'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983'
  //'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983'
  //'IBM.json'
  var url = checked ?
    'https://www.alphavantage.co/query?function=SAR&symbol=' + symbol +'&interval=daily&acceleration=0.02&maximum=0.2&apikey=SKY2KIZNAU91P983' :
    'https://www.alphavantage.co/query?function=SAR&symbol=' + symbol +'&interval=weekly&acceleration=0.02&maximum=0.2&apikey=SKY2KIZNAU91P983';

  await fetch(url)
    .then(response => response.json())
    .then(json => splitData(json,checked))
    .catch(displayError);
}
