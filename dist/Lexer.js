"use strict";
var _ = require("lodash");
var Lexer = (function () {
    function Lexer() {
        this.tokens = [];
        this.index = 0;
    }
    Lexer.prototype.lex = function (str) {
        this.str = str;
        var len = this.str.length;
        var char;
        while (this.index < len) {
            char = str[this.index];
            if (this.match(char, '\\{\\}\\[\\],')) {
                this.tokens.push({
                    text: char
                });
                this.index++;
            }
            else if (char === '"') {
                this.readString();
            }
            else if (char === ':') {
                this.tokens.push({
                    text: char
                });
                this.index++;
            }
            else if (this.isNumber(char)) {
                this.readNumber();
            }
            else if (this.isIdentifier(char)) {
                this.readId();
            }
            else if (this.isWhiteSpace(char)) {
                this.index++;
            }
            else {
                throw new Error('illegal token: ' + char);
            }
        }
        return this.tokens;
    };
    Lexer.prototype.match = function (src, expect) {
        var reg = new RegExp("[" + expect + "]", 'g');
        return reg.test(src);
    };
    Lexer.prototype.readString = function () {
        var subStr = '';
        var char;
        var isEscape = false;
        do {
            this.index++;
            char = this.str[this.index];
            if (isEscape) {
                if (_.has(Lexer.ESCAPES, char)) {
                    char = Lexer.ESCAPES[char];
                    isEscape = false;
                }
                else if (char === 'u') {
                    isEscape = false;
                    var hex = this.str.substring(this.index + 1, this.index + 5);
                    if (!hex.match(/[\da-f]{4}/i)) {
                        throw 'Invalid unicode escape';
                    }
                    this.index += 4;
                    char = String.fromCharCode(parseInt(hex, 16));
                }
                isEscape = false;
            }
            else if (char === '\\') {
                isEscape = true;
                continue;
            }
            else if (char === '"') {
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
    };
    Lexer.prototype.readNumber = function () {
        var number = '';
        var char;
        while (this.index < this.str.length) {
            char = this.str[this.index];
            if (char === '.' || this.isNumber(char)) {
                number += char;
            }
            else {
                var nextChar = this.next();
                var prevChar = this.prev();
                if (char === 'e' && this.isExpOperator(nextChar)) {
                    number += char;
                }
                else if (prevChar === 'e' && this.isExpOperator(char) && nextChar && this.isNumber(nextChar)) {
                    number += char;
                }
                else if (prevChar === 'e' && this.isExpOperator(char) && (!nextChar || this.isNumber(nextChar))) {
                    throw new Error('illegal number token at :' + this.index);
                }
                else {
                    break;
                }
            }
            this.index++;
        }
        this.tokens.push({
            text: number,
            value: Number(number)
        });
    };
    Lexer.prototype.readId = function () {
        var identifier = '';
        var char = this.str[this.index];
        do {
            identifier += char;
            this.index++;
            char = this.str[this.index];
        } while (this.isIdentifier(char) || this.isNumber(char));
        if (!this.isJSONIdentifier(identifier)) {
            throw new Error("json parse erro, unexpected token:" + identifier);
        }
        var IDToken = {
            text: identifier,
            identifier: true
        };
        this.tokens.push(IDToken);
    };
    Lexer.prototype.next = function () {
        return this.str[this.index + 1];
    };
    Lexer.prototype.prev = function () {
        return this.str[this.index - 1];
    };
    Lexer.prototype.isIdentifier = function (char) {
        return /[a-zA-Z]/.test(char);
    };
    Lexer.prototype.isJSONIdentifier = function (str) {
        return /null|false|true/g.test(str);
    };
    Lexer.prototype.isWhiteSpace = function (char) {
        return /\s/.test(char);
    };
    Lexer.prototype.isExpOperator = function (char) {
        return char === '+' || char === '-' || this.isNumber(char);
    };
    Lexer.prototype.isNumber = function (char) {
        return char >= '0' && char <= '9';
    };
    return Lexer;
}());
Lexer.ESCAPES = {
    n: '\n',
    f: '\f',
    r: '\r',
    t: '\t',
    b: '\b'
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Lexer;
