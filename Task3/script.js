document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    function updateDisplay() {
        if (operator) {
            display.textContent = `${previousInput} ${operator} ${currentInput}`;
        } else {
            display.textContent = currentInput || previousInput || '';
        }
    }

    function handleButtonClick(event) {
        const button = event.target;
        const value = button.getAttribute('data-value');
        
        if (button.classList.contains('operator')) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            }
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
        } else if (value === '=') {
            if (previousInput && operator && currentInput) {
                const result = evaluate(previousInput, operator, currentInput);
                updateDisplay();
                previousInput = result;
                currentInput = '';
                operator = '';
            }
        } else {
            currentInput += value;
        }
        updateDisplay();
    }

    function evaluate(a, op, b) {
        switch (op) {
            case '+':
                return parseFloat(a) + parseFloat(b);
            case '-':
                return parseFloat(a) - parseFloat(b);
            case '*':
                return parseFloat(a) * parseFloat(b);
            case '/':
                return parseFloat(a) / parseFloat(b);
            default:
                return '';
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
