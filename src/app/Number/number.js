export class Number {
    constructor(value) {
        this.value = value;
        this.comma = false; 
        this.sign = '+';
    }

    addNewCharacter(value) {
        if(value === '.' && this.comma)
            return;
       if(value === '.')
            this.comma = true;
       if((this.value === '0' || this.value === '') && value !== '.')
            this.value = value;
        else {
            if(this.value === '' && value === '.')
                this.value = '0' + value;
            else
                this.value += value;
        }
    }

    changeSign() {
        if(this.sign === '+')
            this.sign = '-';
        else 
            this.sign = '+';    
    }
}