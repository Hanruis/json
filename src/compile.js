const ASTTypes = require('./astTypes');
const _ = require('lodash');


function compile(ast) {
    return walkAst(ast);
}


function walkAst(ast) {
    let result;
    switch (ast.type) {
        case ASTTypes.OBJ :
            result = {};
            _.forEach(ast.properties, function (property) {
                result[property.key] = walkAst(property.value);
            });
            return result;
        case ASTTypes.ARR:
            result = [];
            _.forEach(ast.elements, function (element) {
                result.push(walkAst(element));
            });
            return result;
        default:
            break;
    }
}
exports.compile = compile
;
