const _ = require('lodash');
const Lexer = require('./Lexer');
const { ast } = require('./ast');
const { compile } = require('./compile');


function parse(jsonStr) {
    if (!_.isString(jsonStr)) {
        throw new Error('parse target must be string ');
    }
    const lexer = new Lexer(jsonStr);
    const tree = ast(tokens);
    const result = compile(tree);
    return result;
}


function toString(obj) {

}


exports.parse = parse;
exports.toString = toString;
