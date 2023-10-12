let livechange = false; 
function oblicz() {
  let value1 = parseFloat(document.getElementById("value_1").value) || 0;
  let value2 = parseFloat(document.getElementById("value_2").value) || 0;
  let value3 = parseFloat(document.getElementById("value_3").value) || 0;
  let value4 = parseFloat(document.getElementById("value_4").value) || 0;

  let sum = value1 + value2 + value3 + value4;
  let average = sum / 4;
  let min = Math.min(value1, value2, value3, value4);
  let max = Math.max(value1, value2, value3, value4);

  document.getElementById("sum_result").textContent = sum;
  document.getElementById("average_result").textContent = average;
  document.getElementById("min_result").textContent = min;
  document.getElementById("max_result").textContent = max;

  let boxResult = document.getElementById("results");
  boxResult.style.display = "block";
}

document.getElementById("calculate_button").addEventListener("click", function(){
    livechange = true;
    oblicz();
});

const inputFields = [
  document.getElementById("value_1"),
  document.getElementById("value_2"),
  document.getElementById("value_3"),
  document.getElementById("value_4"),
];

inputFields.forEach(function (inputField) {
  inputField.addEventListener("input", function(){
    if(livechange == true){
        oblicz();
    }
  });
});
