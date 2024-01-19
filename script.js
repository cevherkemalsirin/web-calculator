"use strict"

// left hand side value and right hand value with the operator in between i.e. 2 + 4 
let LeftValue = 0, operator = "", rightValue = 0;
let isResultShown = false;

const calculationText = document.querySelector(".calculation");
const resultText = document.querySelector(".result");
const bottomPart = document.querySelector(".botPart");
const clearBtn = document.querySelector(".btn-allClear");
let button = null;

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
    button = e.target.closest(".operator");
    if(e.target.classList.contains("num"))
    {
        PressedNum(e.target.textContent);
    }
    else if(button)
    { 
        PressedOperator();
    }
    else if(e.target.classList.contains("btn-equals"))
    {
        Calculate();
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

function PressedOperator(buttontxt)
{
    //if screen is clean and there is no number, User should not put operator without left value
    if(calculationText.textContent)
    {
        if(!rightValue)
        {
            operator = button.getAttribute("data-op");
            calculationText.textContent = calculationText.textContent.split(" ")[0] + " " + operator + " ";
            return;
        }
        // if there are right value or result is shown.
        MoveResultToLeft();
    }
} 

function PressedNum(buttonTxt)
{
    // when result is shown on the screen, user should not press any numbers but operator or clean the screen.
    if(!isResultShown)
    {
        if(buttonTxt === ".")
        {
            if(!operator)
            {
                if(!calculationText.textContent.split(" ")[0].includes("."))
                {
                    calculationText.textContent += buttonTxt;
                    LeftValue = +calculationText.textContent;
                }
            }
            else
            {
                if(!calculationText.textContent.split(" ")[2].includes("."))
                {
                    calculationText.textContent += buttonTxt;
                    rightValue = +calculationText.textContent.split(" ")[2];
                }
 
            }
            
        }
        else 
        {
            calculationText.textContent += buttonTxt;
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

}

function MoveResultToLeft()
{
    ShowResult();
    operator = button.getAttribute("data-op");
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

function Calculate()
{
    if(rightValue && !isResultShown)  // user should not spam = operator after showing the result.
    {
        calculationText.textContent += " = ";
         ShowResult();
         isResultShown = true;
    }
}

//keyboard support
const operators = ["+","/","%","-","*"];
document.addEventListener("keydown", (e)=>
{  
    if(isFinite(e.key) || e.key === ".")
    {
        PressedNum(e.key);
    }
    else if(operators.indexOf(e.key) !== -1)
    {
        button = document.querySelector(`[data-op="${e.key}"]`);
        PressedOperator(e.key);
    }
    else if(e.key ==="Backspace")
    {
        RemoveDigit();
    }
    else if(e.key === "Delete")
    {
        CleanScreen();
    }
    else if(e.key === "Enter" || e.key === "=")
    {
        Calculate();
    }
})