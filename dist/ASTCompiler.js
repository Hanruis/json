"use strict";
var _ = require("lodash");
var ASTTypes_1 = require("./ASTTypes");
var ASTCompiler = (function () {
    function ASTCompiler(astBuilder) {
        this.astBuilder = astBuilder;
    }
    ASTCompiler.prototype.compile = function (str) {
        this.ast = this.astBuilder.ast(str);
        return this.recurse(this.ast);
    };
    ASTCompiler.prototype.recurse = function (ast) {
        var _this = this;
        var result;
        switch (ast.type) {
            case ASTTypes_1.default.Object:
                result = {};
                _.forEach(ast.properties, function (property) {
                    result[property.key.value] = _this.recurse(property.value);
                });
                return result;
            case ASTTypes_1.default.Array:
                result = [];
                _.forEach(ast.elements, function (element) {
                    result.push(_this.recurse(element));
                });
                return result;
            case ASTTypes_1.default.Literal:
                return ast.value;
            default:
                return undefined;
        }
    };
    return ASTCompiler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ASTCompiler;
