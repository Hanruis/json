"use strict";
var _ = require("lodash");
var astTypes_1 = require("./astTypes");
function AST(lexer) {
    this.lexer = lexer;
}
AST.prototype.constants = {
    null: {
        type: astTypes_1.default.Literal,
        value: null
    },
    true: {
        type: astTypes_1.default.Literal,
        value: true
    },
    false: {
        type: astTypes_1.default.Literal,
        value: false
    }
};
AST.prototype.ast = function (text) {
    this.tokens = this.lexer.lex(text);
    return this.build();
};
AST.prototype.build = function () {
    if (this.tokens[0].text === '[') {
        this.tokens.shift();
        return {
            type: astTypes_1.default.Array,
            elements: this.elements(this.tokens)
        };
    }
    else if (this.tokens[0].text === '{') {
        this.tokens.shift();
        return {
            type: astTypes_1.default.Object,
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
            type: astTypes_1.default.Property
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
    if (token.identifier) {
        if (_.has(this.constants, token.text)) {
            primary = this.constants[token.text];
        }
        else {
            throw new Error('unexpect identifier string:' + token.text);
        }
    }
    else {
        primary = {
            type: astTypes_1.default.Literal,
            value: token.value
        };
    }
    return primary;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AST;
