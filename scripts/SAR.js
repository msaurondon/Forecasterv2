export function loadSAR(symbol,checked){
  fetchSAR(symbol,checked);
}

function splitData(data,checked){
  let timeSeries = data["Technical Analysis: SAR"];
  let secondValue = Object.values(timeSeries)[0];
  let sar = Object.values(secondValue)[0];
  console.log("SAR:"+sar);
  document.getElementById("s15").innerHTML = Number(sar).toFixed(2);
}

function displayError(err){
  console.log(err);
}

async function fetchSAR(symbol,checked){
  //'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983'
  //'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' + symbol +'&apikey=SKY2KIZNAU91P983'
  //'IBM.json'
  let sar = 0.0;
  var url = checked ?
    'https://www.alphavantage.co/query?function=SAR&symbol=' + symbol +'&interval=daily&acceleration=0.02&maximum=0.2&apikey=SKY2KIZNAU91P983' :
    'https://www.alphavantage.co/query?function=SAR&symbol=' + symbol +'&interval=weekly&acceleration=0.02&maximum=0.2&apikey=SKY2KIZNAU91P983';

  await fetch(url)
    .then(response => response.json())
    .then(json => splitData(json,checked))
    .catch(displayError);
}
