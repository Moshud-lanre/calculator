const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const acButton = document.querySelector('[data-ac]');
const delButton = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');


class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appenNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '' ) return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let answer;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this. currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                answer = prev + current;
                break;
            case '-':
                answer = prev - current;
                break;
            case '*':
                answer = prev * current;
                break;
            case '/':
                answer = prev / current;
                break;
            default:
                return;

                
        }
        this.currentOperand = answer;
        this.previousOperand = '';
        this.operation = undefined;

    }

    

    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandText.innerText =  `${this.previousOperand} ${this.operation}`
        }else {
            this.previousOperandText.innerText = ''; 
        }
        

    }
}




const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appenNumber(button.innerText)
        calculator.updateDisplay()
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

delButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})