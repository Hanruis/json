import * as _ from 'lodash';
import ASTTypes from './ASTTypes';
import AST from './AST';


function recurse(ast: any){
    let result;
    switch (ast.type) {
        case ASTTypes.Object :
            result = {};
            _.forEach(ast.properties, (property) => {
                result[property.key.value] = recurse(property.value);
            });
            return result;
        case ASTTypes.Array:
            result = [];
            _.forEach(ast.elements, (element) => {
                result.push(recurse(element));
            });
            return result;
        case ASTTypes.Literal:
            return ast.value;
        default:
            return undefined;
    }
}


function compile(ast: any) {
        const type = ast.type;
        if (type !== ASTTypes.Object && type !== ASTTypes.Array){
            throw new Error(`json parse error, unexpected token:${ast}`);
        }

        return recurse(ast);
}



export {
    compile
};

