import * as _ from 'lodash';
import ASTTypes from './ASTTypes';
import AST from './AST';


class ASTCompiler{

    astBuilder: AST;
    ast: any;

    constructor(astBuilder: AST){
        this.astBuilder = astBuilder;
    }
    compile(str){
        this.ast = this.astBuilder.ast(str);

        const type = this.ast.type;
        if (type !== ASTTypes.Object && type !== ASTTypes.Array){
            throw new Error(`json parse error, unexpected token:${this.ast}`);
        }

        return this.recurse(this.ast);
    }
    recurse(ast){
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
    }
}

export default ASTCompiler;

