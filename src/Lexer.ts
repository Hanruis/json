
import * as _ from 'lodash';
import {LexerToken} from './interface';




class Lexer {

    static ESCAPES = {
        n: '\n',
        f: '\f',
        r: '\r',
        t: '\t',
        b: '\b'
    };

    tokens: LexerToken[];
    index: number;
    str: string;
    constructor() {
        this.tokens = [];
        this.index = 0;
    }
    lex(str: string) {
        this.str = str;
        const len = this.str.length;
        let char;
        while (this.index < len) {
            char = str[this.index];
            if (this.match(char, '\\{\\}\\[\\],')) {
                this.tokens.push({
                    text: char
                });
                this.index++;
            } else if (char === '"') {
                this.readString();
            } else if (char === ':') {
                this.tokens.push({
                    text: char
                });
                this.index++;
            } else if (this.isNumber(char)) {
                this.readNumber();
            } else if (this.isIdentifier(char)) {
                this.readId();
            } else if (this.isWhiteSpace(char)) {
                this.index++;
            } else {
                throw new Error('illegal token: ' + char);
            }
        }
        return this.tokens;
    }
    match(src: string, expect: string): boolean {
        const reg = new RegExp(`[${expect}]`, 'g');
        return reg.test(src);
    }
    readString(): void {
        let subStr = '';
        let char;
        let isEscape = false;
        do {
            this.index++;
            char = this.str[this.index];

            if (isEscape) {
                if (_.has(Lexer.ESCAPES, char)) {
                    char = Lexer.ESCAPES[char];
                    isEscape = false;
                } else if (char === 'u') {
                    isEscape = false;
                    const hex = this.str.substring(this.index + 1, this.index + 5);
                    if (!hex.match(/[\da-f]{4}/i)) {
                        throw 'Invalid unicode escape';
                    }
                    this.index += 4;
                    char = String.fromCharCode(parseInt(hex, 16));
                }
                isEscape = false;
            } else if (char === '\\') {
                isEscape = true;
                continue;
            } else if (char === '"') {
                this.index++;
                this.tokens.push({
                    text: subStr,
                    value: subStr // 这个要准备转义用的
                });
                return;
            }
            subStr += char;
        } while (char);
        throw new Error('json read string error:');
    }
    readNumber(): void{
        let number = '';
        let char;
        while (this.index < this.str.length) {
            char = this.str[this.index];
            if (char === '.' || this.isNumber(char)) {
                number += char;
            } else {
                const nextChar = this.next();
                const prevChar = this.prev();
                if (char === 'e' && this.isExpOperator(nextChar)) {
                    number += char;
                } else if (prevChar === 'e' && this.isExpOperator(char) && nextChar && this.isNumber(nextChar)) {
                    number += char;
                } else if (prevChar === 'e' && this.isExpOperator(char) && (!nextChar || this.isNumber(nextChar))) {
                    throw new Error('illegal number token at :' + this.index);
                } else {
                    break;
                }
            }
            this.index++;
        }
        this.tokens.push({
            text: number,
            value: Number(number)
        });
    }
    readId(){
        let identifier = '';
        let char = this.str[this.index];
        do {
            identifier += char;
            this.index++;
            char = this.str[this.index];
        } while (this.isIdentifier(char) || this.isNumber(char));

        this.tokens.push({
            text: identifier,
            identifier: true
        });
    }
    next(): string{
        return this.str[this.index + 1];
    }
    prev(): string{
        return this.str[this.index - 1];
    }
    isIdentifier(char: string){
        return /[a-zA-Z]/.test(char);
    }
    isWhiteSpace(char){
        return /\s/.test(char);
    }
    isExpOperator(char){
        return char === '+' || char === '-' || this.isNumber(char);
    }
    isNumber(char: string): boolean{
        return char >= '0' && char <= '9';
    }

}

export default Lexer;