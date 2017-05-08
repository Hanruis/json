"use strict";
var Lexer_1 = require("./Lexer");
var AST_1 = require("./AST");
var Compiler_1 = require("./Compiler");
var serialize_1 = require("./serialize");
exports.serialize = serialize_1.default;
var Parser = (function () {
    // ASTCompiler: ASTCompiler;
    function Parser() {
        this.lexer = new Lexer_1.default();
        this.ast = new AST_1.default(this.lexer);
    }
    /**
     * 测试文档生成的效果
     * @param text 测试
     */
    Parser.prototype.parse = function (text) {
        var tokenStream = this.lexer.lex(text);
        var jsonAst = this.ast.ast(tokenStream);
        return Compiler_1.compile(jsonAst);
    };
    return Parser;
}());
exports.Parser = Parser;
