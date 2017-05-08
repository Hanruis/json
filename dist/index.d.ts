import Lexer from './Lexer';
import AST from './AST';
import serialize from './serialize';
declare class Parser {
    lexer: Lexer;
    ast: AST;
    constructor();
    /**
     * 测试文档生成的效果
     * @param text 测试
     */
    parse(text: string): any;
}
export { Parser, serialize };
