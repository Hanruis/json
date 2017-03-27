"use strict";
var _ = require("lodash");
function serialize(obj) {
    if (!_.isObject(obj) && !_.isArray(obj)) {
        throw new Error('obj:serialize target must be pure object or array');
    }
    function _serialize(src) {
        if (_.isFunction(src)) {
            throw new Error('serizlize target must be obj or array');
        }
        if (_.isArray(src)) {
            var elements = _.map(src, function (item) {
                return _serialize(item);
            }).join(',');
            return "[" + elements + "]";
        }
        else if (_.isObject(src)) {
            var properties = _.map(src, function (value, key) {
                var valString = _serialize(value);
                return "\"" + key + "\":" + valString;
            }).join(',');
            return "{" + properties + "}";
        }
        else if (_.isNumber(src)) {
            return src.toString();
        }
        else if (_.isString(src)) {
            return "\"" + src + "\"";
        }
        else if (_.isNull(src)) {
            return 'null';
        }
        else if (_.isBoolean(src)) {
            return src ? 'true' : 'false';
        }
        else {
            throw new Error('unexpected serilize target:' + src);
        }
    }
    return _serialize(obj);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = serialize;
