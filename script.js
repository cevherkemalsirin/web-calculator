"use strict"

// left hand side value and right hand value with the operator in between i.e. 2 + 4 
let LeftValue, operator, rightValue;
let currentResult = 0;
let operatorPressed = false;
let isResultShown = false;

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
    else if(e.target.classList.contains("btn-equals"))
    {
        if(rightValue && !isResultShown)  // user should not spam = operator after showing the result.
        {
            calculationText.textContent += " = ";
             ShowResult();
        }
    }

});

function PressedOperator(button)
{
    //if screen is clean and there is no number, User should not put operator without left value
    if(calculationText.textContent)
    {
        button.classList.contains("btn-pow") ? operator = button.getAttribute("data-op") : operator = button.textContent;
        if(!isResultShown)
        {
            if(!operatorPressed)
            {
               operatorPressed = true;
               calculationText.textContent += " " + operator + " " ; 
            }
            else  // if there is no right value and operator is spammed. Change the operator
            {
                calculationText.textContent = calculationText.textContent.split(" ")[0] + " " + operator + " ";
            }
        }
        else
        {
            ShowResult();
            button.classList.contains("btn-pow") ? operator = button.getAttribute("data-op") : operator = button.textContent;
            operatorPressed = true;
            LeftValue = +resultText.textContent;
            calculationText.textContent = `${LeftValue} ${operator} `;
            isResultShown = false;
            rightValue = 0;
            resultText.innerHTML = "<br>";
        }

    }

}

function PressedNum(button)
{
    // when result is shown on the screen, user should not press any numbers but operator or clean the screen.
    if(!isResultShown)
    {
        calculationText.textContent += button.textContent;

        if(!operatorPressed)
        {
            LeftValue = +calculationText.textContent;
        }
        else
        {
            rightValue = +calculationText.textContent.split(" ")[2];
            operatorPressed = false;
        }
    }

}

function CleanScreen()
{
    isResultShown = false;
    rightValue = 0;
    LeftValue = 0;
    operator = "";
    resultText.innerHTML = "<br>";
    calculationText.textContent = "";
    operatorPressed = false;
}

function ShowResult()
{
    resultText.textContent = Math.round(TextToCalc(calculationText.textContent) * 100) / 100;
    isResultShown = true;
}