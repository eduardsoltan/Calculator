export class Stack {
    constructor() {
        this.numbers = [];
        this.operation = [];
    }

    parseToNumbers(arrayNr, arrayOp) {
        arrayNr.forEach(element => {
            let number = parseFloat(element.value);
            
            if(element.sign === '-')
                number = (-1) * number;
            
            this.numbers.push(number);
        });

        this.operation = arrayOp;
    }

    isVida(stack) {
        return stack.length;
    }

    push(stack, value) {
        stack.push(value);
        return stack;
    }

    top(stack) {
        return stack[stack.length - 1];
    }

    pop(stack) {
        stack.pop();
        return stack;
    }

    priority(value) {
        if(value === '+' || value === '-')
            return 0;
        if(value === '*' || value === '/')
            return 1;
    }

    popCoada(array) {
        array.splice(0, 1);
        return array;
    }

    execute(array, term1, term2, operation) {
        let result;
        if(operation === '+')
            result = term1 + term2;
        else if(operation === '-')
            result = term1 - term2;
        else if(operation === '*')
            result = term1 * term2;
        else if(operation === '/')
            result = term1 / term2;
        array = this.push(array, result);
        return array;
    }
     
    performOperation() {
        let postf = [];
        let stiva = [];
        let currentPriority = -1;
        postf.push(this.numbers[0]);
        this.numbers = this.popCoada(this.numbers);

        while(this.isVida(this.operation) !== 0) {
            const x = this.operation[0];
            const num = this.numbers[0];
            this.operation = this.popCoada(this.operation);           
            this.numbers = this.popCoada(this.numbers);

            const nextPriority = this.priority(x);
            while(nextPriority <= currentPriority) {
                const oper = this.top(stiva);
                const term2 = this.top(postf);
                postf = this.pop(postf);
                const term1 = this.top(postf);
                postf = this.pop(postf);
                postf = this.execute(postf, term1, term2, oper);
                stiva = this.pop(stiva);
                if(this.isVida(stiva) !== 0) 
                    currentPriority = this.priority(this.top(stiva));
                else 
                    currentPriority = -1;
            }
                
            stiva = this.push(stiva, x);
            postf = this.push(postf, num);
            currentPriority = nextPriority;
        }

        while(this.isVida(stiva) !== 0) {
            const oper = this.top(stiva);
            const term2 = this.top(postf);
            postf = this.pop(postf);
            const term1 = this.top(postf);
            postf = this.pop(postf);
            postf = this.execute(postf, term1, term2, oper);
            stiva = this.pop(stiva);
        }

        return postf[0];
    } 
}