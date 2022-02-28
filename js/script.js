const buttons = document.querySelector(".calculator-buttons");
const inputScreen = document.querySelector(".bottom-screen");
const answerScreen = document.querySelector(".top-screen");
const equalsBtn = document.querySelector(".btn-equal");

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (number1, operator, number2) {
  switch (operator) {
    case "+":
      return add(number1, number2);
      break;
    case "-":
      return subtract(number1, number2);
      break;
    case "x":
      return multiply(number1, number2);
      break;
    case "/":
      return divide(number1, number2);
      break;
  }
};

let firstValue = false;
let displayValue = "";
let firstNumber;
let secondNumber;
let operator = "";

const storeNumbers = function (e) {
  displayValue += e.target.textContent;
  inputScreen.textContent = displayValue;
};

const storeOperations = function (e) {
  firstNumber = parseFloat(displayValue);
  operator = e.target.textContent;
  displayValue = "";
};

const displayValuesOnScreen = function () {
  buttons.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-number")) {
      storeNumbers(e);
    } else if (e.target.classList.contains("btn-operator")) {
      storeOperations(e);
    }
  });
};

displayValuesOnScreen();

equalsBtn.addEventListener("click", function () {
  secondNumber = parseFloat(displayValue);
  const answer = operate(firstNumber, operator, secondNumber);
  displayValue = answer;
  answerScreen.textContent = answer;
});
