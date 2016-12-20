/**
 * @param {String} src
 * @param {String} expect
 * @returns {Boolean} ..
 */

/**
 * constructor
 * @param {String} str json string
 */
function Lexer() {
    this.tokens = [];
    this.index = 0;
}

Lexer.prototype.lex = function (str) {
    this.str = str;
    const len = this.str.length;
    let char;
    while (this.index < len) {
        char = str[this.index];
        if (this.match(char, '\\{\\}\\[\\]')) {
            this.tokens.push({
                text: char
            });
            this.index++;
        } else if (char === '"') {
            this.readString();
        } else if (char === ':') {
            this.tokens.push({
                text:char
            });
            this.index++;
        } else if (this.isNumber(char)) {
            this.readNumber();
        } else {
            throw new Error('illegal token: ' + char);
        }
    }
    return this.tokens;
};

Lexer.prototype.match = function (src, expect) {
    const reg = new RegExp(`[${expect}]`, 'g');
    return reg.test(src);
};

Lexer.prototype.readString = function () {
    let subStr = '';
    let char;
    do {
        this.index++;
        char = this.str[this.index];
        if (char === '"') {
            this.index++;
            this.tokens.push({
                text:subStr,
                value:subStr // 这个要准备转义用的
            });
            return;
        }
        subStr += char;
    } while (char);
    throw new Error('json read string error:');
};

Lexer.prototype.isNumber = function (char) {
    return char >= '0' && char <= '9';
};


Lexer.prototype.readNumber = function () {
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
        text:number,
        value:Number(number)
    });
};

Lexer.prototype.next = function () {
    return this.str[this.index + 1];
};

Lexer.prototype.prev = function () {
    return this.str[this.index - 1];
};


Lexer.prototype.isExpOperator = function (char) {
    return char === '+' || char === '-' || this.isNumber(char);
};

module.exports = Lexer;
