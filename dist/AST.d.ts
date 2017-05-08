import Lexer from './Lexer';
import { LexerToken, TokenIdentify } from './interface';
declare class AST {
    private lexer;
    private tokens;
    constants: {
        null: {
            type: string;
            value: any;
        };
        true: {
            type: string;
            value: boolean;
        };
        false: {
            type: string;
            value: boolean;
        };
    };
    constructor(lexer: Lexer);
    ast(tokenStream: LexerToken[]): any;
    build(): any;
    properties(tokens: LexerToken[]): any[];
    primary(): any;
    isIdentifyNode(token: LexerToken): token is TokenIdentify;
    elements(tokens: LexerToken[]): any[];
    nextToken(): LexerToken;
    expectNext(expect: string): boolean;
    expect(expect: string): boolean;
    consume(expect?: any): void;
}
export default AST;
