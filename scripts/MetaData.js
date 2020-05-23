

  export function constructMetaData(jsonMetaData){
    console.log(jsonMetaData);

    setSymbol(jsonMetaData["2. Symbol"]);
    setDate(jsonMetaData["3. Last Refreshed"]);
  }

  function setSymbol(symbol){
    let p = window.document.getElementById('s2');
    //p.append(symbol);
    p.innerHTML = symbol;
  }

  function setDate(date){
    let p = window.document.getElementById('s3');
    p.innerHTML = date;
  }
