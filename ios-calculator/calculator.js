"use strict";

const display = document.querySelector(".calc-display");
const clear = document.querySelector("#btn-clear");
const absBtn = document.querySelector("#btn-abs");
const percentBtn = document.querySelector("#btn-percentage");
const pointBtn = document.querySelector("#btn-point");
const equalsBtn = document.querySelector("#btn-equals");
const zeroBtn = document.querySelector("#btn-0");
const operatorBtns = document.querySelector(".btns-general");

let displayNum = "0";
let previousEvent;
let operationSymbol;
let initialNum;
let finalNum;

//////////// Operator Functions //////////////
const addNums = function (num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
};

const subrtactNums = function (num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
};

const multiplyNums = function (num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
};

const divideNums = function (num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
};

/////////// Buttons functionality/////////////

// Setting up clear functionality
clear.addEventListener("click", function () {
  if (displayNum !== "0") {
    displayNum = "0";
    display.textContent = displayNum;
    clear.textContent = "AC";
  }
});

// Setting up all number buttons' functionality
window.addEventListener("click", function (event) {
  event.preventDefault();
  const key = event.target;
  const action = key.dataset.operation;
  console.log(previousEvent);
  if (event.target.className === "btn" && displayNum.length < 9) {
    // Clear the display if previous click was an operation
    if (previousEvent === "btn--symbols isActive") {
      displayNum = "";
    }

    // remove zero before adding any number if its not a decimal
    if (!displayNum.includes(".") && displayNum[0] === "0") {
      displayNum = "";
    }

    // Remove zero when inputting negative numbers
    if (
      displayNum[0] === "-" &&
      displayNum[1] === "0" &&
      !displayNum.includes(".")
    ) {
      displayNum = displayNum[0];
    }
    clear.textContent = "C";
    displayNum += event.target.innerText;
    display.textContent = displayNum;
    previousEvent = event.target.className;

    // Remove the isActive class from every operation button
    Array.from(key.parentNode.children).forEach((item) =>
      item.classList.remove("isActive")
    );
  }
});

// Implementing zero button
zeroBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (displayNum !== "0" && displayNum.length < 9) {
    display.textContent = displayNum + zeroBtn.textContent;
  }
});

// Implementing the point button
pointBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (displayNum.length < 8 && !displayNum.includes(".")) {
    displayNum += ".";
    display.textContent = displayNum;
  }
});

// Implementing absolute converter button
absBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (displayNum[0] === "-") {
    displayNum = displayNum.slice(1);
    display.textContent = displayNum;
  } else {
    displayNum = "-" + displayNum;
    display.textContent = displayNum.slice(0, 9);
  }
});

// Percentage functionality
percentBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (displayNum !== "0") {
    displayNum = String(parseFloat(displayNum) / 100).slice(0, 9);
    display.textContent = displayNum;
  }
});

// Selecting operator buttons
operatorBtns.addEventListener("click", function (event) {
  event.preventDefault();
  const key = event.target;
  const action = key.dataset.operation;
  if (action) {
    if (previousEvent === "answer-op") {
      displayNum = "";
    }
    initialNum = Number(display.textContent);
    key.classList.add("isActive");
    operationSymbol = action;
    previousEvent = event.target.className;
  }
});

// Setting up the 'equals to' button
equalsBtn.addEventListener("click", function (event) {
  event.preventDefault();
  finalNum = displayNum;

  // Handle calculations and display no more than 9 characters
  if (operationSymbol === "add") {
    displayNum = String(addNums(initialNum, finalNum)).slice(0, 9);
    display.textContent = displayNum;
  }
  if (operationSymbol === "subtract") {
    displayNum = String(subtractNums(Parsefloat(initialNum), finalNum)).slice(
      0,
      9
    );
    display.textContent = displayNum;
  }
  if (operationSymbol === "multiply") {
    displayNum = String(multiplyNums(initialNum, finalNum)).slice(0, 9);
    display.textContent = displayNum;
  }
  if (operationSymbol === "divide") {
    displayNum = String(divideNums(initialNum, finalNum)).slice(0, 9);
    display.textContent = displayNum;
  }
  previousEvent = event.target.className;
});
