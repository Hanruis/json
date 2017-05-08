export interface TokenParentheses {
    text: '{' | '}' | '[' | ']';
}
export interface TokenColon {
    text: ':';
}
export interface TokenString {
    text: string;
    value: string;
}
export interface TokenNumber {
    text: string;
    value: number;
}
export declare type NoneOrBoolean = 'null' | 'true' | 'false';
export interface TokenIdentify {
    text: NoneOrBoolean;
    identifier: true;
}
export declare type LexerToken = TokenParentheses | TokenColon | TokenString | TokenNumber | TokenIdentify;
export declare type LexerPrimaryToken = TokenString | TokenNumber | TokenIdentify;
export declare type LexerLiteralToken = TokenString | TokenNumber;
export interface Json {
    [x: string]: string | number | boolean | Date | Json | JsonArray;
}
export interface JsonArray extends Array<string | number | boolean | Date | Json | JsonArray> {
}
export declare type ASTTypeProperty = 'Property';
export interface ASTPropertyNode {
    type: ASTTypeProperty;
    key: LexerToken;
    value: any;
}
