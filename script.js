const btnsEle = document.querySelectorAll("button:not(#clearHistory)");
const inputEle = document.getElementById("result");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// ========== BUTTON PRESS HANDLER ==========
btnsEle.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "C") {
      clearResult();
    } else if (value === "=") {
      calculateResult();
    } else {
      appendValue(value);
    }
  });
});

// ========== CLEAR INPUT ==========
function clearResult() {
  inputEle.value = "";
}

// ========== APPEND VALUES ==========
function appendValue(value) {
  if (value === "π") value = Math.PI;
  if (value === "e") value = Math.E;

  inputEle.value += value;
}

// ========== CALCULATE RESULT ==========
function calculateResult() {
  let expression = inputEle.value;

  expression = expression
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/log/g, "Math.log10")
    .replace(/√/g, "Math.sqrt")
    .replace(/π/g, "Math.PI")
    .replace(/e/g, "Math.E")
    .replace(/x²/g, "**2")
    .replace(/\^/g, "**");

  try {
    const result = eval(expression);
    addToHistory(inputEle.value, result);
    inputEle.value = result;
  } catch {
    inputEle.value = "Error";
  }
}

// ========== ADD HISTORY ==========
function addToHistory(expression, result) {
  const div = document.createElement("div");
  div.classList.add("history-item");
  div.textContent = `${expression} = ${result}`;
  historyList.appendChild(div);

  historyList.scrollTop = historyList.scrollHeight; // auto scroll
}

// ========== CLEAR HISTORY ==========
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});
