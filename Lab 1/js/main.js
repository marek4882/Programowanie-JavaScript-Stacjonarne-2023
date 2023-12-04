let livechange = false;

function count() {
  const inputFields = Array.from(
    document.querySelectorAll(".form_group input")
  );
  const values = inputFields.map((input) => parseFloat(input.value) || 0);

  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / inputFields.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  document.getElementById("sum_result").textContent = sum;
  document.getElementById("average_result").textContent = average;
  document.getElementById("min_result").textContent = min;
  document.getElementById("max_result").textContent = max;

  let boxResult = document.getElementById("results");
  boxResult.style.display = "block";
}

document
  .getElementById("calculate_button")
  .addEventListener("click", function () {
    livechange = true;
    count();
  });

document
  .getElementById("add_field_button")
  .addEventListener("click", function () {
    const form = document.getElementById("calculator_form");
    const newField = document.createElement("div");
    newField.classList.add("form_group");

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "text";
    input.name = "dynamic_value";
    input.classList.add("dynamic_input");
    label.textContent =
      "Value " + (document.querySelectorAll(".form_group").length + 1);

    newField.appendChild(label);
    newField.appendChild(input);
    form.insertBefore(newField, document.getElementById("calculate_button"));

    input.addEventListener("input", function () {
      if (livechange) {
        count();
      }
    });
  });

document.addEventListener("input", function () {
  if (livechange) {
    count();
  }
});
