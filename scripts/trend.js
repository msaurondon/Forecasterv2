export function setTrend(close, trendMA){
  if(close > trendMA) return 1;
  if(close <= trendMA) return -1;

}
