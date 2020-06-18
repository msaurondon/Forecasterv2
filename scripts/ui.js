import {loadData} from '/scripts/GetData.js'

let symbol = 'IBM';

window.goClicked = goClicked;

function goClicked(){
  var checked = document.getElementById("sliderSwitch").checked;
  symbol = document.getElementById("s1").value;
  //document.getElementById("welcome").style.display = "none";
  loadData(symbol, checked);
  //document.getElementById("swiftmessage").style.display = "grid";
}
