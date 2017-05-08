import * as _ from 'lodash';
import { Json, JsonArray } from './interface';
import Lexer from './Lexer';
import AST from './AST';
import {compile} from './Compiler';
import serialize from './serialize';

class Parser{

    lexer: Lexer;
    ast: AST;
    // ASTCompiler: ASTCompiler;

    constructor(){
        this.lexer = new Lexer();
        this.ast = new AST(this.lexer);
    }
    /**
     * 测试文档生成的效果
     * @param text 测试
     */
    parse(text: string) {
        const tokenStream = this.lexer.lex(text);
        const jsonAst = this.ast.ast(tokenStream);
        return compile(jsonAst);
    }
}


export {
    Parser,
    serialize
}

