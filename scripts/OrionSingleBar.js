// 1. Highest High
// 2. Lowest Low
// 3. Are we in consolidation?
// 4. What is the trend attitude?
// 5. Pick correct multiplier based on above criteria.
// 6. Calculate price projection based on single bar.

let highestHigh = 0.0;
let lowestLow = 0.0;
let barsBack = 11; // 10 days not including current;

export function OrionSingleBar(jsonObj){
  let transactionDate = today;
  let lastTradeDate = jsonObj[Object.keys(jsonObj)[0]];

  try{
    for(var x in jsonObj){
      transactionDate = Object.keys(jsonObj)[barsBack];
      if(barsBack <= 1){
        fetchBoundaries(jsonObj[transactionDate]);
        barsBack--;
      }
      else {
        break;
      }
    }
  }
  catch(err){
    console.log("createSMA: "+err);
  }



}

function fetchBoundaries(jsonData){
  let high = jsonData["2. high"];
  let low = jsonData["3. low"];
  higher(high);
  lower(low);
}

function higher(high){
  highestHigh = highestHigh > high ? highestHigh : high;
}

function lower(low){
  lowestLow = lowestLow < low ? lowestLow : low;
}
