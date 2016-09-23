/* eslint no-unused-expressions: 0 */
import '../utils/test';
import { detect, generate } from './wildcard';

describe('connectedData/wildcard', () => {
  describe('detect', () => {
    it('no wildcard', () => {
      detect('').should.equal(false);
      detect(undefined).should.equal(false);
      detect('foo').should.equal(false);
      detect('foo.bar').should.equal(false);
    });
    it('wildcard', () => {
      detect('*').should.equal(true);
      detect('?').should.equal(true);
      detect('foo?').should.equal(true);
      detect('foo*').should.equal(true);
      detect('foo*bar?').should.equal(true);
    });
  });
  describe('generate', () => {
    it('returns regexp', () => {
      generate('*').should.be.an('regexp');
      generate('foo').should.be.an('regexp');
      generate().should.be.an('regexp');
      generate('').should.be.an('regexp');
    });
    it('works', () => {
      generate('fo?').test('foo').should.equal(true);
      generate('fo?o').test('fooo').should.equal(true);
      generate('fo*').test('foooo').should.equal(true);
      generate('fo*baz').test('foobarbaz').should.equal(true);
      generate('fo?').test('fooo').should.equal(false);
      generate('foo*').test('barfoo').should.equal(false);
    });
  });
});
