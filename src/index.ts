const Lexer = require('./Lexer');
const AST = require('./AST');
const ASTCompiler = require('./ASTCompiler');
const _ = require('lodash');

function Parser() {
    this.lexer = new Lexer();
    this.ast = new AST(this.lexer);
    this.ASTCompiler = new ASTCompiler(this.ast);
}

Parser.prototype.parse = function (text) {
    return this.ASTCompiler.compile(text);
};

function serialize(obj) {
    if (!_.isObject(obj) && !_.isArray(obj)) {
        throw new Error();
    }

    function _serialize(src) {
        if (_.isFunction(src)) {
            throw new Error('serizlize target must be obj or array');
        }

        if (_.isArray(src)) {
            const elements = _.map(src, function (item) {
                return _serialize(item);
            }).join(',');
            return `[${elements}]`;
        } else if (_.isObject(src)) {
            const properties = _.map(src, function (value, key) {
                const valString = _serialize(value);
                return `"${key}":${valString}`;
            }).join(',');
            return `{${properties}}`;
        } else if (_.isNumber(src)) {
            return src;
        } else if (_.isString(src)) {
            return `"${src}"`;
        } else if (_.isNull(src)) {
            return 'null';
        } else if (_.isBoolean(src)) {
            return src ? 'true' : 'false';
        } else {
            throw new Error('unexpected serilize target:' + src);
        }
    }

    return _serialize(obj);
}


exports.Parser = Parser;
exports.serialize = serialize;
