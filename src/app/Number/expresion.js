import { Number } from './number'
import { Stack } from './stack'

export class Expression {
    constructor() {
        const number = new Number('');
        this.numberArray = [];
        this.operationArray = [];
        this.numberArray.push(number);
        this.index = 0;
        this.innerText = '';
        
    }

    createInital(numberString) {
        const number = new Number(numberString);
        this.numberArray = [];
        this.operationArray = [];
        this.numberArray.push(number);
        this.index = 0;
        this.innerText = '';
    }

    truncateResult(n) {
        let s = n.toString().split('.');
        if(s[1] && s[1].length > 4) {
            n = n.toFixed(4);
            return n;
        }

        return n;
    }

    initApp() {
        this.drawExpression();
        const digits = document.querySelectorAll('.number');
        const operations = document.querySelectorAll('.operations');
        
        digits.forEach((digit) => {
            digit.addEventListener('click', (event) => {
                const value = event.target.value;
                
                this.numberArray[this.index].addNewCharacter(value);
                this.modifyExpression();
                this.drawExpression();
            });
        });

        operations.forEach((operation) => {
            operation.addEventListener('click', (event) => {
                const currentNumber = this.numberArray[this.index].value;
                const value = event.target.value;
                
                if(currentNumber !== '') {
                    if(this.numberArray[this.index].value === '0' && value === '/') 
                        return;
                
                    this.operationArray[this.index] = value;
                    const number = new Number('');
                    this.numberArray.push(number);
                    this.index++; 
                }
                else {
                    if(this.numberArray[this.index].sign === '-') {
                        this.numberArray[this.index].changeSign();
                        this.operationArray[this.index - 1] = value;
                        this.modifyExpression();
                        this.drawExpression();
                        return;
                    }

                    if(value === '-') 
                        this.numberArray[this.index].changeSign();
                    else
                        this.operationArray[this.index - 1] = value;
                }
                
                this.modifyExpression();
                this.drawExpression();
            });
        });

        const clear = document.getElementById('clear');

        clear.addEventListener('click', (event) => {
            this.clearData();
        });

        const equals = document.getElementById('equals');

        equals.addEventListener('click', (event) => {
            const stack = new Stack();

            stack.parseToNumbers(this.numberArray, this.operationArray);
            let result = stack.performOperation();
            
            result = this.truncateResult(result);

            this.clearData();
            const stringResult = result.toString();
            this.createInital(stringResult);
            this.modifyExpression();
            this.drawExpression();
            
        });
    }

    drawExpression() {
        const display = document.getElementById('display');
        display.innerHTML = '';
        const text = document.createTextNode(this.innerText);

        display.appendChild(text);
    }

    modifyExpression() {
        this.innerText = '';
        this.numberArray.forEach((nr, index) => {
            if(nr.sign === '-')
                this.innerText = this.innerText + '(-' + nr.value + ')';
            else 
                this.innerText += nr.value;
            
            if(index < this.operationArray.length)
                this.innerText += this.operationArray[index];
        });
    }

    clearData() {
        const number = new Number('');
        this.numberArray = [];
        this.operationArray = [];
        this.numberArray.push(number);
        this.index = 0;
        this.innerText = '0';
        this.drawExpression();
    }
}