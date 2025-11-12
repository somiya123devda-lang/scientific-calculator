const btnsEle = document.querySelectorAll("button");
const inputEle = document.getElementById("result");

for (let i = 0; i < btnsEle.length; i++) {
  btnsEle[i].addEventListener("click", () => {
    const btnValue = btnsEle[i].textContent;

    if (btnValue === "C") {
      clearResult();
    } else if (btnValue === "=") {
      calculateResult();
    } else {
      appendValue(btnValue);
    }
  });
}

function clearResult() {
  inputEle.value = "";
}

function appendValue(btnValue) {
  if (btnValue === "π") btnValue = Math.PI;
  if (btnValue === "e") btnValue = Math.E;
  inputEle.value += btnValue;
}

function calculateResult() {
  let expression = inputEle.value;

  // Replace math functions for eval()
  expression = expression.replace(/sin/g, "Math.sin");
  expression = expression.replace(/cos/g, "Math.cos");
  expression = expression.replace(/tan/g, "Math.tan");
  expression = expression.replace(/log/g, "Math.log10");
  expression = expression.replace(/√/g, "Math.sqrt");
  expression = expression.replace(/π/g, "Math.PI");
  expression = expression.replace(/e/g, "Math.E");
  expression = expression.replace(/x²/g, "**2");
  expression = expression.replace(/\^/g, "**");

  try {
    inputEle.value = eval(expression);
  } catch {
    inputEle.value = "Error";
  }
}
