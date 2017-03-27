import * as _ from 'lodash';

function serialize(obj: Json): string {
    if (!_.isObject(obj) && !_.isArray(obj)) {
        throw new Error('obj:serialize target must be pure object or array');
    }
    function _serialize(src: any): string {
        if (_.isFunction(src)) {
            throw new Error('serizlize target must be obj or array');
        }

        if (_.isArray(src)) {
            const elements = _.map(src, function (item) {
                return _serialize(item);
            }).join(',');
            return `[${elements}]`;
        } else if (_.isObject(src)) {
            const properties = _.map(<Json>src, function (value, key) {
                const valString = _serialize(value);
                return `"${key}":${valString}`;
            }).join(',');
            return `{${properties}}`;
        } else if (_.isNumber(src)) {
            return src.toString();
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

export default serialize;