const ASTTypes = require('./astTypes');

/**
 * @param {array} str  json string
 */
function AST(lexer) {
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
            type:ASTTypes.Array,
            elements:this.elements(this.tokens)
        };
    } else if (this.tokens[0].text === '{') {
        this.tokens.shift();
        return {
            type:ASTTypes.Object,
            properties:this.properties(this.tokens)
        };
    } else {
        return this.primary();
    }
    throw new Error('unexpect json string');
};

AST.prototype.properties = function (tokens) {
    const props = [];
    if (this.expect('}')) {
        this.consume();
        return props;
    }

    do {
        const prop = {
            type:ASTTypes.Property
        };
        prop.key = this.nextToken();
        this.consume(':');
        prop.value = this.primary();
        props.push(prop);
    } while (this.expect(','));

    return props;
};


AST.prototype.primary = function () {
    return {
        type:ASTTypes.Literal,
        value:this.nextToken().value
    };
};

AST.prototype.elements = function (tokens) {
    return [];
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
    } else {
        const token = this.nextToken();
        if (token.text !== expect) {
            throw new Error('unexepect token :' + expect);
        }
    }
};

module.exports = AST;
