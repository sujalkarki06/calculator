
const current = document.getElementById("current");
const history = document.getElementById("history");

const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const percent = document.getElementById("percent");
const decimal = document.getElementById("decimal");
const equals = document.getElementById("equals");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultShown = false;

// Add a number to the display
function addNumber(number) {
  if (resultShown) {
    current.textContent = "0";
    history.textContent = "";
    resultShown = false;
  }

  if (current.textContent === "0") {
    current.textContent = number;
  } else {
    current.textContent += number;
  }
}

// Select all number buttons
for (let i = 0; i <= 9; i++) {
  document.getElementById(i).addEventListener("click", function () {
    addNumber(i.toString());
  });
}

// Add a decimal point
decimal.addEventListener("click", function () {
  if (resultShown) {
    current.textContent = "0";
    resultShown = false;
  }

  if (!current.textContent.includes(".")) {
    current.textContent += ".";
  }
});

// Select an operator
function chooseOperator(symbol) {
  firstNumber = current.textContent;
  operator = symbol;
  history.textContent = firstNumber + " " + symbol;
  current.textContent = "0";
  resultShown = false;
}

document.getElementById("add").addEventListener("click", function () {
  chooseOperator("+");
});

document.getElementById("subtract").addEventListener("click", function () {
  chooseOperator("-");
});

document.getElementById("multiply").addEventListener("click", function () {
  chooseOperator("×");
});

document.getElementById("divide").addEventListener("click", function () {
  chooseOperator("÷");
});

// Calculate the result
equals.addEventListener("click", function () {
  if (operator === "") {
    return;
  }

  secondNumber = current.textContent;

  let a = Number(firstNumber);
  let b = Number(secondNumber);
  let answer;

  if (operator === "+") {
    answer = a + b;
  } else if (operator === "-") {
    answer = a - b;
  } else if (operator === "×") {
    answer = a * b;
  } else if (operator === "÷") {
    if (b === 0) {
      current.textContent = "Cannot divide by 0";
      history.textContent = "";
      operator = "";
      resultShown = true;
      return;
    }

    answer = a / b;
  }

  history.textContent = firstNumber + " " + operator + " " + secondNumber + " =";
  current.textContent = Number(answer.toFixed(8)).toString();

  operator = "";
  resultShown = true;
});

// Clear the calculator
clear.addEventListener("click", function () {
  current.textContent = "0";
  history.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  resultShown = false;
});

// Delete the last digit
backspace.addEventListener("click", function () {
  if (resultShown) {
    current.textContent = "0";
    history.textContent = "";
    resultShown = false;
  } else {
    current.textContent = current.textContent.slice(0, -1);

    if (
      current.textContent === "" ||
      current.textContent === "-"
    ) {
      current.textContent = "0";
    }
  }
});

// Calculate percentage
percent.addEventListener("click", function () {
  let number = Number(current.textContent);
  current.textContent = (number / 100).toString();
  resultShown = false;
});
