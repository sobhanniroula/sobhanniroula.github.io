// Defining calculator constructor
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
}

// Updating to the screen
function updateDisplay() {
    document.querySelector('.calculator-display').value = calculator.displayValue;
}
updateDisplay();


// Handling key presses
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (e) => {
    if (!e.target.matches('button')) {
        return;
    } else if (e.target.classList.contains('operator')) {
        handleOperator(e.target.value);
        updateDisplay();
        return;
    } else if (e.target.classList.contains('decimal-key')) {
        inputDecimal(e.target.value);
        updateDisplay();
        return;
    } else if (e.target.classList.contains('all-clear-key')) {
        resetCalculator();
        updateDisplay();
        return;
    } else if (e.target.classList.contains('number-keys')) {
        inputNumber(e.target.value);
        updateDisplay();
        return;
    }
});


// Handling numbers
function inputNumber(num) {
    const displayValue = calculator.displayValue;
    const waitingForSecondOperand = calculator.waitingForSecondOperand;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = num;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

// Handling decimal
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        return;
    } else {
        // check if decimal already exists or not
        if (!calculator.displayValue.includes(dot)) {
            // Append the decimal point
            calculator.displayValue += dot;
        }
    }
}


// Handling operators: +, -, *, /, =
function handleOperator(nextOperator) {
    //    const firstOperand = calculator.firstOperand;
    //    const displayValue = calculator.displayValue;
    //    const operator = calculator.operator;
    // The above declarations can be shortened by destructuring, like below:
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand) {
        return calculator.operator = nextOperator;
    } else {
        if (firstOperand === null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const currentValue = firstOperand || 0;
            const result = performCalculation[operator](firstOperand, inputValue);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }
}

 
// Calculation Object
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
}



// Initializing
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}