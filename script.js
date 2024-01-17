"use strict"

// left hand side value and right hand value with the operator in between i.e. 2 + 4 
let LeftValue, operator, rightValue;
let currentResult = 0;
const calculationText = document.querySelector(".calculation");
const resultText = document.querySelector(".result");

let operation = {
    "+" : (a,b) => a + b,
    "-" : (a,b) => a - b,
    "*" : (a,b) => a * b,
    "/" : (a,b) => a / b,
    "**": (a,b) => a ** b,
    "%" : (a,b) => a % b
}

function Operate (rValue, operator, lValue)
{
    return operation[operator](rValue,lValue);
}

function TextToCalc(opText)
{
    [LeftValue , operator, rightValue ] = opText.split(" ");
     
    return Operate(+LeftValue, operator, +rightValue);
    
}

resultText.textContent = TextToCalc(calculationText.textContent);      