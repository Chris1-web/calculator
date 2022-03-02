const buttons = document.querySelector(".calculator-buttons");
const inputScreen = document.querySelector(".bottom-screen");
const answerScreen = document.querySelector(".top-screen");
const equalsBtn = document.querySelector(".btn-equal");
const clearBtn = document.querySelector(".btn-clear");
const backBtn = document.querySelector(".btn-back");

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

let displayValue = ""; //value to be displayed on screen
let firstNumber = ""; //first number inputed before calculator
let secondNumber = ""; //first number inputed after operator
let operator = "";
let answer;
let firstValue; //converted firstNumber( from string to number )
let secondValue; //converted secondNumber( from string to number )
let displayedAnswer;
let dot;

const storeNumbers = function (e) {
  /* if there is no operator, the number would be recorded in the first Number string. 
  However, if there is already an operator, the numbers would be saved in second number string */
  if (operator === "") {
    firstNumber += e.target.textContent;
  } else {
    secondNumber += e.target.textContent;
  }
  displayValue += e.target.textContent;
  inputScreen.textContent = displayValue;
};

const storeOperations = function (e) {
  /* if there is no operator, the operator would be saved. However, mostly for multiple operations, 
  if there is already an operator, there is a need to get the first number, second number 
  and perform the needed operation, then the new answer is given back as the new first number, 
  the original operator is removed, the initial second number is also removed, 
  and the newly clicked operator is given as the new operator */
  if (operator === "") {
    operator = e.target.textContent;
  }
  // for multiple steps mostly
  else {
    if (secondNumber === "") {
      //if another operation is clicked instead of secondNumber, go ahead and replace the operator with the new one.
      operator = "";
      operator = e.target.textContent;
      displayValue = displayValue.slice(0, -1);
      displayValue += operator;
      return;
    }
    console.log("we here");
    console.log(firstNumber, secondNumber);
    firstValue = parseFloat(firstNumber);
    secondValue = parseFloat(secondNumber);
    answer = operate(firstValue, operator, secondValue);
    firstNumber = answer;
    operator = "";
    secondNumber = "";
    operator = e.target.textContent;
  }
  displayValue += operator;
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
  firstValue = parseFloat(firstNumber);
  secondValue = parseFloat(secondNumber);
  if (firstValue === undefined || secondValue === undefined) return;
  answer = operate(firstValue, operator, secondValue);
  if (answer === Infinity || Number.isNaN(answer)) {
    answer = "ERROR";
    answerScreen.textContent = answer;
    return;
  }

  if (answer % 1 !== 0) {
    answer = answer.toFixed(2);
  }

  answerScreen.textContent = answer;
});

clearBtn.addEventListener("click", function (e) {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  displayValue = "";
  firstValue = "";
  secondValue = "";
  answerScreen.textContent = displayValue;
  inputScreen.textContent = displayValue;
});

backBtn.addEventListener("click", function () {
  if (operator === "" && secondNumber === "") {
    firstNumber = firstNumber.slice(0, -1);
    displayValue = firstNumber;
    inputScreen.textContent = displayValue;
  } else if (operator !== "") {
    displayValue = displayValue.replace(secondNumber, "");
    secondNumber = secondNumber.slice(0, -1);
    displayValue += secondNumber;
    inputScreen.textContent = displayValue;
  }
  if (displayValue.slice(-1) === operator) {
    operator = "";
    displayValue = firstNumber;
    inputScreen.textContent = displayValue;
  }
});
