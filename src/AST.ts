import * as _ from 'lodash';
import ASTTypes from './ASTTypes';
import Lexer from './Lexer';
import { LexerToken, ASTPropertyNode, LexerLiteralToken } from './interface';





class AST {

    private lexer: Lexer;
    private tokens: LexerToken[];

    constants = {
        null: {
            type: ASTTypes.Literal,
            value: null
        },
        true: {
            type: ASTTypes.Literal,
            value: true
        },
        false: {
            type: ASTTypes.Literal,
            value: false
        }
        // undefined: {
        //     type: ASTTypes.Literal,
        //     value:undefined
        // }
    };

    constructor(lexer: Lexer) {
        this.lexer = lexer;
    }
    ast(text: string) {
        this.tokens = this.lexer.lex(text);
        return this.build();
    }
    build() {
        if (this.tokens[0].text === '[') {
            this.tokens.shift();
            return {
                type: ASTTypes.Array,
                elements: this.elements(this.tokens)
            };
        } else if (this.tokens[0].text === '{') {
            this.tokens.shift();
            return {
                type: ASTTypes.Object,
                properties: this.properties(this.tokens)
            };
        } else {
            return this.primary();
        }
    }
    properties(tokens: LexerToken[]) {
        const props = [];
        if (this.expect('}')) {
            this.consume();
            return props;
        }

        do {
            const prop = {
                type: ASTTypes.Property
            } as ASTPropertyNode;
            prop.key = this.nextToken();
            this.consume(':');
            prop.value = this.build();
            props.push(prop);
        } while (this.expectNext(','));

        return props;
    }
    primary() {
        let primary;
        const token = <LexerLiteralToken>this.nextToken();
        if (_.has(token, 'identifier')) {
            if (_.has(this.constants, token.text)) {
                primary = this.constants[token.text];
            } else {
                throw new Error('unexpect identifier string:' + token.text);
            }
        } else {
            primary = {
                type: ASTTypes.Literal,
                value: token.value
            };
        }

        return primary;
    }
    elements(tokens: LexerToken[]) {
        const elements = [];

        if (this.expect(']')) {
            this.consume();
            return elements;
        }

        do {
            elements.push(this.build());
        } while (this.expectNext(','));

        return elements;
    }
    nextToken(): LexerToken {
        return this.tokens.shift();
    }
    expectNext(expect: string) {
        return this.nextToken().text === expect;
    }
    expect(expect: string) {
        return this.tokens.length && this.tokens[0].text === expect;
    }
    consume(expect?) {
        if (!expect) {
            this.tokens.shift();
            return;
        } else {
            const token = this.nextToken();
            if (token.text !== expect) {
                throw new Error('unexepect token :' + expect);
            }
        }
    }
}

export default AST;


// function AST(lexer) {
//     this.lexer = lexer;
// }

// AST.prototype.constants = {
//     null: {
//         type: ASTTypes.Literal,
//         value: null
//     },
//     true: {
//         type: ASTTypes.Literal,
//         value: true
//     },
//     false: {
//         type: ASTTypes.Literal,
//         value: false
//     }
//     // undefined: {
//     //     type: ASTTypes.Literal,
//     //     value:undefined
//     // }
// };

// AST.prototype.ast = function (text) {
//     this.tokens = this.lexer.lex(text);
//     return this.build();
// };

// AST.prototype.build = function () {
//     if (this.tokens[0].text === '[') {
//         this.tokens.shift();
//         return {
//             type: ASTTypes.Array,
//             elements: this.elements(this.tokens)
//         };
//     } else if (this.tokens[0].text === '{') {
//         this.tokens.shift();
//         return {
//             type: ASTTypes.Object,
//             properties: this.properties(this.tokens)
//         };
//     } else {
//         return this.primary();
//     }
// };

// AST.prototype.properties = function (tokens) {
//     const props = [];
//     if (this.expect('}')) {
//         this.consume();
//         return props;
//     }

//     do {
//         const prop = {
//             type: ASTTypes.Property
//         };
//         prop.key = this.nextToken();
//         this.consume(':');
//         prop.value = this.build();
//         props.push(prop);
//     } while (this.expectNext(','));

//     return props;
// };


// AST.prototype.primary = function () {
//     let primary;
//     const token = this.nextToken();
//     if (token.identifier) {
//         if (_.has(this.constants, token.text)) {
//             primary = this.constants[token.text];
//         } else {
//             throw new Error('unexpect identifier string:' + token.text);
//         }
//     } else {
//         primary = {
//             type: ASTTypes.Literal,
//             value: token.value
//         };
//     }

//     return primary;
// };

// AST.prototype.elements = function (tokens) {
//     const elements = [];

//     if (this.expect(']')) {
//         this.consume();
//         return elements;
//     }

//     do {
//         elements.push(this.build());
//     } while (this.expectNext(','));

//     return elements;
// };


// AST.prototype.nextToken = function () {
//     return this.tokens.shift();
// };

// AST.prototype.expectNext = function (expect) {
//     return this.nextToken().text === expect;
// };

// AST.prototype.expect = function (expect) {
//     return this.tokens.length && this.tokens[0].text === expect;
// };

// AST.prototype.consume = function (expect) {
//     if (!expect) {
//         this.tokens.shift();
//         return;
//     } else {
//         const token = this.nextToken();
//         if (token.text !== expect) {
//             throw new Error('unexepect token :' + expect);
//         }
//     }
// };

// export default AST;
