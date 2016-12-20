const Lexer = require('./Lexer');
const AST = require('./AST');
const ASTCompiler = require('./ASTCompiler');


function Parser() {
    this.lexer = new Lexer();
    this.ast = new AST(this.lexer);
    this.ASTCompiler = new ASTCompiler(this.ast);
}


Parser.prototype.parse = function (text) {
    return this.ASTCompiler.compile(text);
};


exports.Parser = Parser;
exports.toString = toString;
