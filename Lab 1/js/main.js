document.getElementById("calculate-button").addEventListener("click", function() {
    let value1 = parseFloat(document.getElementById("value1").value) || 0;
    let value2 = parseFloat(document.getElementById("value2").value) || 0;
    let value3 = parseFloat(document.getElementById("value3").value) || 0;
    let value4 = parseFloat(document.getElementById("value4").value) || 0;

    let sum = value1 + value2 + value3 + value4;
    let average = sum / 4;
    let min = Math.min(value1, value2, value3, value4);
    let max = Math.max(value1, value2, value3, value4);

    document.getElementById("sum-result").textContent = sum;
    document.getElementById("average-result").textContent = average;
    document.getElementById("min-result").textContent = min;
    document.getElementById("max-result").textContent = max;

    let boxResult = document.getElementById("results");
    boxResult.style.display="block"
});
