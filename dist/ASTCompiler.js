var ASTTypes = require('./astTypes');
var _ = require('lodash');
function ASTCompiler(astBuilder) {
    this.astBuilder = astBuilder;
}
ASTCompiler.prototype.compile = function (str) {
    this.ast = this.astBuilder.ast(str);
    return this.recurse(this.ast);
};
ASTCompiler.prototype.recurse = function (ast) {
    var _this = this;
    var result;
    switch (ast.type) {
        case ASTTypes.Object:
            result = {};
            _.forEach(ast.properties, function (property) {
                result[property.key.value] = _this.recurse(property.value);
            });
            return result;
        case ASTTypes.Array:
            result = [];
            _.forEach(ast.elements, function (element) {
                result.push(_this.recurse(element));
            });
            return result;
        case ASTTypes.Literal:
            return ast.value;
        default:
            return undefined;
    }
};
module.exports = ASTCompiler;
