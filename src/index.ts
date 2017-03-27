import * as _ from 'lodash';
import { Json, JsonArray } from './interface';
import Lexer from './Lexer';
import AST from './AST';
import ASTCompiler from './ASTCompiler';
import serialize from './serialize';

class Parser{

    lexer: Lexer;
    ast: AST;
    ASTCompiler: ASTCompiler;

    constructor(){
        this.lexer = new Lexer();
        this.ast = new AST(this.lexer);
        this.ASTCompiler = new ASTCompiler(this.ast);
    }
    parse(text: string){
        return this.ASTCompiler.compile(text);
    }
}




exports.Parser = Parser;
exports.serialize = serialize;
