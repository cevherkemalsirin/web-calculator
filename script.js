"use strict"

// left hand side value and right hand value with the operator in between i.e. 2 + 4 
let LeftValue, operator, rightValue;
let currentResult = 0;
let operatorPressed = false;
let expression = "";
const calculationText = document.querySelector(".calculation");
const resultText = document.querySelector(".result");
const bottomPart = document.querySelector(".botPart");

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

bottomPart.addEventListener("click", (e)=>
{
    let button = e.target.closest(".operator");
    if(e.target.classList.contains("num"))
    {
        PressedNum(e.target);
    }
    else if(button)
    { 
        PressedOperator(button);
    }

});


function PressedOperator(button)
{
    if(calculationText.textContent)
    {
        if(!operatorPressed)
        {
            operatorPressed = true;
           button.classList.contains("btn-pow") ? operator = button.getAttribute("data-op") : operator = button.textContent;
           calculationText.textContent += " " + operator; 
        }
        else
        {
            button.classList.contains("btn-pow") ? operator = button.getAttribute("data-op") : operator = button.textContent;
            calculationText.textContent = calculationText.textContent.split(" ")[0] + " " + operator;
        }
    }

}

function PressedNum(button)
{
    if(!operatorPressed)
    {
        expression = button.textContent;
        calculationText.textContent += `${expression}`;
    }
}
