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


module.exports = Lexer;
