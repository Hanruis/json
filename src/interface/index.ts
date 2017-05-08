
export interface TokenParentheses{
    text: '{' |'}' |'[' |']';
}

export interface TokenColon{
    text: ':';
}

export interface TokenString{
    text: string;
    value: string;
}

export interface TokenNumber{
    text: string;
    value: number;
}

export type NoneOrBoolean = 'null'| 'true'|'false';

export interface TokenIdentify{
    text: NoneOrBoolean;
    identifier: true;
}

export type LexerToken = TokenParentheses|TokenColon|TokenString|TokenNumber|TokenIdentify;

export type LexerPrimaryToken = TokenString |TokenNumber| TokenIdentify;
export type LexerLiteralToken = TokenString |TokenNumber;


export interface Json {
    [x: string]: string | number | boolean | Date | Json | JsonArray;
}

export interface JsonArray extends Array<string | number | boolean | Date | Json | JsonArray> { }



export  type ASTTypeProperty = 'Property';
type ASTTypeObject = 'Object';
type ASTTypeArray = 'Array';
type ASTTypeLiteral = 'Literal';
type ASTTypeElements = 'Elements';

export  interface ASTPropertyNode {
    type: ASTTypeProperty;
    key: LexerToken;
    value: any;
}




