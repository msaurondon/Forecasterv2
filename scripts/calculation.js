
export function OrionPrime(high, low, version){
  let prime = 0.0;
  switch(version){
    case 1:
      prime = ((high - low) * 1.618);
      break;
    case 2:
      prime = ((high - low) * .618);
      break;
    case 3:
      prime = ((high - low) * .382);
      break
    default:
      prime = (high - low);
      break
  }

  return prime;
}
