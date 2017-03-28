"use strict";
var _ = require("lodash");
var ASTTypes_1 = require("./ASTTypes");
var AST = (function () {
    function AST(lexer) {
        this.constants = {
            null: {
                type: ASTTypes_1.default.Literal,
                value: null
            },
            true: {
                type: ASTTypes_1.default.Literal,
                value: true
            },
            false: {
                type: ASTTypes_1.default.Literal,
                value: false
            }
        };
        this.lexer = lexer;
    }
    AST.prototype.ast = function (text) {
        this.tokens = this.lexer.lex(text);
        return this.build();
    };
    AST.prototype.build = function () {
        if (this.tokens[0].text === '[') {
            this.tokens.shift();
            return {
                type: ASTTypes_1.default.Array,
                elements: this.elements(this.tokens)
            };
        }
        else if (this.tokens[0].text === '{') {
            this.tokens.shift();
            return {
                type: ASTTypes_1.default.Object,
                properties: this.properties(this.tokens)
            };
        }
        else {
            return this.primary();
        }
    };
    AST.prototype.properties = function (tokens) {
        var props = [];
        if (this.expect('}')) {
            this.consume();
            return props;
        }
        do {
            var prop = {
                type: ASTTypes_1.default.Property
            };
            prop.key = this.nextToken();
            this.consume(':');
            prop.value = this.build();
            props.push(prop);
        } while (this.expectNext(','));
        return props;
    };
    AST.prototype.primary = function () {
        var primary;
        var token = this.nextToken();
        if (this.isIdentifyNode(token)) {
            if (_.has(this.constants, token.text)) {
                primary = this.constants[token.text];
            }
            else {
                throw new Error('unexpect identifier string:' + token.text);
            }
        }
        else {
            primary = {
                type: ASTTypes_1.default.Literal,
                value: token.value
            };
        }
        return primary;
    };
    AST.prototype.isIdentifyNode = function (token) {
        return token.identifier !== undefined;
    };
    ;
    AST.prototype.elements = function (tokens) {
        var elements = [];
        if (this.expect(']')) {
            this.consume();
            return elements;
        }
        do {
            elements.push(this.build());
        } while (this.expectNext(','));
        return elements;
    };
    AST.prototype.nextToken = function () {
        return this.tokens.shift();
    };
    AST.prototype.expectNext = function (expect) {
        return this.nextToken().text === expect;
    };
    AST.prototype.expect = function (expect) {
        return this.tokens.length && this.tokens[0].text === expect;
    };
    AST.prototype.consume = function (expect) {
        if (!expect) {
            this.tokens.shift();
            return;
        }
        else {
            var token = this.nextToken();
            if (token.text !== expect) {
                throw new Error('unexepect token :' + expect);
            }
        }
    };
    return AST;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AST;
