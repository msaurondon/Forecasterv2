import {loadData} from '/scripts/GetData.js'

let symbol = 'IBM';

window.goClicked = goClicked;

function goClicked(){
  var checked = document.getElementById("sliderSwitch").checked;
  symbol = document.getElementById("s1").value;
  loadData(symbol, checked);
}
