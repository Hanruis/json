import * as _ from 'lodash';
import ASTTypes from './astTypes';

function ASTCompiler(astBuilder) {
    this.astBuilder = astBuilder;
}


ASTCompiler.prototype.compile = function (str) {
    this.ast = this.astBuilder.ast(str);
    return this.recurse(this.ast);
};


ASTCompiler.prototype.recurse = function (ast) {
    let result;
    switch (ast.type) {
        case ASTTypes.Object :
            result = {};
            _.forEach(ast.properties, (property) => {
                result[property.key.value] = this.recurse(property.value);
            });
            return result;
        case ASTTypes.Array:
            result = [];
            _.forEach(ast.elements, (element) => {
                result.push(this.recurse(element));
            });
            return result;
        case ASTTypes.Literal:
            return ast.value;
        default:
            return undefined;
    }
};

export default ASTCompiler;
