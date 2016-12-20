
const ASTTypes = require('./astTypes');

/**
 * @param {array} tokens
 */
function AST(tokens) {
    this.token = tokens;
}

AST.prototype.ast = function () {
    if (this.tokens[0].text === '[') {
        this.tokens.shift();
        return {
            type:ASTTypes.ARR,
            elements:this.elements(this.tokens)
        };
    } else if (this.tokens[0].text === '{') {
        this.tokens.shift();
        return {
            type:ASTTypes.OBJ,
            properties:this.properties(this.tokens)
        };
    }
};

AST.prototype.properties = function (tokens) {
    return {};
};

AST.prototype.elements = function (tokens) {
    return [];
};


module.exports = AST;
