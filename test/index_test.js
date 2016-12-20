const { expect } = require('chai');
const { Parser } = require('../src');

describe('parse', () => {
    let parser;

    beforeEach(function () {
        parser = new Parser();
    });

    // it('should parse empty {}', () => {
    //     const result = parser.parse('{}');
    //     expect(result).to.eql({});
    // });
    // it('should parse empty []', () => {
    //     const result = parser.parse('[]');
    //     expect(result).to.eql([]);
    // });
    it('should parse obj key & string type value', () => {
        const result = parser.parse('{"key":"value"}');
        expect(result).to.eql({ key:'value' });
    });
});

