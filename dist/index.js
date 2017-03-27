"use strict";
var Lexer_1 = require("./Lexer");
var AST_1 = require("./AST");
var ASTCompiler_1 = require("./ASTCompiler");
var serialize_1 = require("./serialize");
var Parser = (function () {
    function Parser() {
        this.lexer = new Lexer_1.default();
        this.ast = new AST_1.default(this.lexer);
        this.ASTCompiler = new ASTCompiler_1.default(this.ast);
    }
    Parser.prototype.parser = function (text) {
        return this.ASTCompiler.compile(text);
    };
    return Parser;
}());
exports.Parser = Parser;
exports.serialize = serialize_1.default;
