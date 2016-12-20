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
    it('should parse several obj key & string type value', () => {
        const result = parser.parse('{"key":"value", "key2":"value2"}');
        expect(result).to.eql({ key:'value', key2:'value2' });
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
    it('should parse empyt string value', () => {
        const result = parser.parse('{"key":""}');
        expect(result).to.eql({ key:'' });
    });
    it('should parse empyt null value', () => {
        const result = parser.parse('{"key":null}');
        expect(result).to.eql({ key:null });
    });
    it('should parse empyt true value', () => {
        const result = parser.parse('{"key":true}');
        expect(result).to.eql({ key:true });
    });
    it('should parse empyt false value', () => {
        const result = parser.parse('{"key":false}');
        expect(result).to.eql({ key:false });
    });
    it('should parse formarted json string ', () => {
        const result = parser.parse(`{
            "key":false
        }`);
        expect(result).to.eql({ key:false });
    });
    it('should ignore white space', () => {
        const result = parser.parse('{ "key":false}');
        expect(result).to.eql({ key:false });
    });

    it('should parse array elements', () => {
        const result = parser.parse('["a", "b"]');
        expect(result).to.eql(['a', 'b']);
    });

    it('should parse array number boolean null elements', () => {
        const result = parser.parse('[1, "b", null]');
        expect(result).to.eql([1, 'b', null]);
    });

    it('should parse array value', () => {
        const result = parser.parse('{"key":["a", "b"]}');
        expect(result).to.eql({ key:['a', 'b'] });
    });

    it('should parse object in array', () => {
        const result = parser.parse('[{"key":1}]');
        expect(result).to.eql([{ key:1 }]);
    });
});

