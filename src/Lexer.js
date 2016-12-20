/**
 * @param {String} src
 * @param {String} expect
 * @returns {Boolean} ..
 */

/**
 * constructor
 * @param {String} str json string
 * @returns {Array} tokens
 */
function Lexer(str) {
    this.str = str;
    this.tokens = [];
    this.index = 0;
}


Lexer.prototype.lex = function () {
    const len = this.str.length;
    const str = this.str;
    let char;
    while (this.index < len) {
        char = str[this.index];
        if (this.match(char, '\\{\\}\\[\\]')) {
            this.tokens.push({
                text:char
            });
            this.index++;
        } else if (char === '\"') {
            this.tokens.push(this.readString());
        }
    }

    return this.tokens;
};

Lexer.prototype.match = function (src, expect) {
    const reg = new RegExp(`[${expect}]`, 'g');
    return reg.test(src);
};

Lexer.prototype.readString = function () {
    const subStr = '';
    let char;
    do {
        this.index++;
        char = this.str[this.index];
        if (char === '\"') {
            return subStr;
        } else {
            subStr += char;
        }
    } while (char);
};


module.exports = Lexer;
