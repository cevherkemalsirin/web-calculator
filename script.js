"use strict"

// left hand side value and right hand value with the operator in between i.e. 2 + 4 
let LeftValue = 0, operator = "", rightValue = 0;
let isResultShown = false;

const calculationText = document.querySelector(".calculation");
const resultText = document.querySelector(".result");
const bottomPart = document.querySelector(".botPart");
const clearBtn = document.querySelector(".btn-allClear");

let operation = {
    "+" : (a,b) => a + b,
    "-" : (a,b) => a - b,
    "*" : (a,b) => a * b,
    "/" : (a,b) => a / b,
    "**": (a,b) => a ** b,
    "%" : (a,b) => a % b
}

function Operate(rValue, operator, lValue)
{
    return operation[operator](rValue,lValue);
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
             isResultShown = true;
        }
    }
    else if(e.target.classList.contains("delete"))
    {
        if(e.target.classList.contains("btn-allClear"))
        {
            CleanScreen();
        }
        else
        {
            RemoveDigit();
        }
    }

});

function PressedOperator(button)
{
    //if screen is clean and there is no number, User should not put operator without left value
    if(calculationText.textContent)
    {
        if(!rightValue)
        {
            button.classList.contains("btn-pow") ? operator = button.getAttribute("data-op") : operator = button.textContent;
            calculationText.textContent = calculationText.textContent.split(" ")[0] + " " + operator + " ";
            return;
        }
        // if there are right value or result is shown.
        MoveResultToLeft(button);
}

function PressedNum(button)
{
    // when result is shown on the screen, user should not press any numbers but operator or clean the screen.
    if(!isResultShown)
    {
        calculationText.textContent += button.textContent;
        if(!operator)
        {
            LeftValue = +calculationText.textContent;
        }
        else
        {
            rightValue = +calculationText.textContent.split(" ")[2];
        }
    }

}

function MoveResultToLeft(button)
{
    ShowResult();
    button.classList.contains("btn-pow") ? operator = button.getAttribute("data-op") : operator = button.textContent;
    LeftValue = +resultText.textContent;
    rightValue = "";
    calculationText.textContent = `${LeftValue} ${operator} `;
    resultText.innerHTML = "<br>";
    isResultShown = false;
}

function CleanScreen()
{
    isResultShown = false;
    rightValue = 0;
    LeftValue = 0;
    operator = "";
    resultText.innerHTML = "<br>";
    calculationText.textContent = "";
}

function RemoveDigit()
{
    if(rightValue)
    {
        rightValue = Math.trunc(rightValue / 10);
        calculationText.textContent = calculationText.textContent.slice(0,-1);
    }
    else if(operator)
    {
        operator = "";
        calculationText.textContent =  calculationText.textContent.slice (0,-3);
    }
    else if(LeftValue)
    {
        calculationText.textContent = calculationText.textContent.slice(0,-1);
    }
}

function ShowResult()
{
    resultText.textContent = Math.round(Operate(LeftValue,operator,rightValue) * 100) / 100;
}