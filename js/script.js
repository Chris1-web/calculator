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

const operate = function (operator, number1, number2) {
  switch (operator) {
    case "+":
      return add(number1, number2);
      break;
    case "-":
      return subtract(number1, number2);
      break;
    case "*":
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

const displayValuesOnScreen = function () {
  buttons.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-number")) {
      displayValue += e.target.textContent;
      inputScreen.textContent = displayValue;
    } else if (e.target.classList.contains("btn-operator")) {
      firstNumber = parseFloat(displayValue);
      operator = e.target.textContent;
      displayValue = "";
    }
  });
};

displayValuesOnScreen();

equalsBtn.addEventListener("click", function () {
  secondNumber = parseFloat(displayValue);
  const answer = operate(operator, firstNumber, secondNumber);
  displayValue = answer;
  answerScreen.textContent = answer;
});
