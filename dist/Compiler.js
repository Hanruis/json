"use strict";
var _ = require("lodash");
var ASTTypes_1 = require("./ASTTypes");
function recurse(ast) {
    var result;
    switch (ast.type) {
        case ASTTypes_1.default.Object:
            result = {};
            _.forEach(ast.properties, function (property) {
                result[property.key.value] = recurse(property.value);
            });
            return result;
        case ASTTypes_1.default.Array:
            result = [];
            _.forEach(ast.elements, function (element) {
                result.push(recurse(element));
            });
            return result;
        case ASTTypes_1.default.Literal:
            return ast.value;
        default:
            return undefined;
    }
}
function compile(ast) {
    var type = ast.type;
    if (type !== ASTTypes_1.default.Object && type !== ASTTypes_1.default.Array) {
        throw new Error("json parse error, unexpected token:" + ast);
    }
    return recurse(ast);
}
exports.compile = compile;
