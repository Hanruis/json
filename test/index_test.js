const { expect } = require('chai');
const { parse } = require('../src');

describe('parse', () => {
    it('should parse empty {}', () => {
        const result = parse('{}');
        expect(result).to.eql({});
    });
    it('should parse empty []', () => {
        const result = parse('[]');
        expect(result).to.eql([]);
    });
    it('should parse obj key & string type value', () => {
        const result = parse('{"key":"value"}');
        expect(result).to.eql({ key:'value' });
    });
});

