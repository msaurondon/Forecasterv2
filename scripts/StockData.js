export function createStockData(jsonStockData){
  setLastPrice(jsonStockData);
}

function setLastPrice(jsonStockData){
  let counter = 0;
  let dateKey = Object.keys(jsonStockData)[counter];
  let close = jsonStockData[dateKey]["4. close"];
  let p = document.getElementById("s4");
  p.innerHTML = parseFloat(close).toFixed(2);
}
