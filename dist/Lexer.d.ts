import { LexerToken } from './interface';
declare class Lexer {
    static ESCAPES: {
        n: string;
        f: string;
        r: string;
        t: string;
        b: string;
    };
    tokens: LexerToken[];
    index: number;
    str: string;
    constructor();
    lex(str: string): LexerToken[];
    match(src: string, expect: string): boolean;
    readString(): void;
    readNumber(): void;
    readId(): void;
    next(): string;
    prev(): string;
    isIdentifier(char: string): boolean;
    isJSONIdentifier(str: string): boolean;
    isWhiteSpace(char: any): boolean;
    isExpOperator(char: any): boolean;
    isNumber(char: string): boolean;
}
export default Lexer;
