const { expect } = require('chai');
const { Parser } = require('../src');

describe('parse', () => {
    let parser;

    beforeEach(function () {
        parser = new Parser();
    });

    it('should parse empty {}', () => {
        const result = parser.parse('{}');
        expect(result).to.eql({});
    });
    it('should parse empty []', () => {
        const result = parser.parse('[]');
        expect(result).to.eql([]);
    });
    it('should parse obj key & string type value', () => {
        const result = parser.parse('{"key":"value"}');
        expect(result).to.eql({ key:'value' });
    });

    it('should throw err while not use " for key name', () => {
        expect(function () {
            parser.parse('{\'key\':"value"}');
        }).to.throw();
    });
    it('should parse number value', () => {
        const result = parser.parse('{"key":112}');
        expect(result).to.eql({ key:112 });
    });
});

