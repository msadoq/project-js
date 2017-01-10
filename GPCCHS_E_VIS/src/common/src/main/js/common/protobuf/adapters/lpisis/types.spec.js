const { should } = require('../../../utils/test');
const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,
  shortToBytes,
  bytesToShort,
  uoctetToBytes,
  bytesToUoctet,
  octetToBytes,
  bytesToOctet,
} = require('./types');
const ByteBuffer = require('bytebuffer');

describe('protobuf/lpisis/types', () => {
  describe('uoctetToBytes/bytesToUoctet', () => {
    const number = 21;
    let buffer;
    describe('uoctetToBytes', () => {
      it('works', () => {
        buffer = uoctetToBytes(number);
        (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => uoctetToBytes('string')).should.throw(Error);
        (() => uoctetToBytes(NaN)).should.throw(Error);
        (() => uoctetToBytes(null)).should.not.throw(Error);
        (() => uoctetToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToUoctet', () => {
      it('works', () => {
        bytesToUoctet(buffer).should.equal(number);
      });
      it('invalid input', () => {
        should.not.exist(bytesToUoctet(NaN));
        should.not.exist(bytesToUoctet(null));
        should.not.exist(bytesToUoctet());
      });
    });
  });
  describe('octetToBytes/bytesToOctet', () => {
    const number = 21;
    let buffer;
    describe('octetToBytes', () => {
      it('works', () => {
        buffer = octetToBytes(number);
        (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => octetToBytes('string')).should.throw(Error);
        (() => octetToBytes(NaN)).should.throw(Error);
        (() => octetToBytes(null)).should.not.throw(Error);
        (() => octetToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToOctet', () => {
      it('works', () => {
        bytesToOctet(buffer).should.equal(number);
      });
      it('invalid input', () => {
        should.not.exist(bytesToOctet('string'));
        should.not.exist(bytesToOctet(NaN));
        should.not.exist(bytesToOctet(null));
        should.not.exist(bytesToOctet());
      });
    });
  });
  describe('ushortToBytes/bytesToUshort', () => {
    const number = 21;
    let buffer;
    describe('ushortToBytes', () => {
      it('works', () => {
        buffer = ushortToBytes(number);
        (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => ushortToBytes('string')).should.throw(Error);
        (() => ushortToBytes(NaN)).should.throw(Error);
        (() => ushortToBytes(null)).should.not.throw(Error);
        (() => ushortToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToUshort', () => {
      it('works', () => {
        // bytesToUshort(buffer.toBuffer()).should.equal(number);
        bytesToUshort(buffer).should.equal(number);
      });
      it('invalid input', () => {
        should.not.exist(bytesToUshort('string'));
        should.not.exist(bytesToUshort(NaN));
        should.not.exist(bytesToUshort(null));
        should.not.exist(bytesToUshort());
      });
    });
  });
  describe('shortToBytes/bytesToShort', () => {
    const number = 21;
    let buffer;
    describe('shortToBytes', () => {
      it('works', () => {
        buffer = shortToBytes(number);
        (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => shortToBytes('string')).should.throw(Error);
        (() => shortToBytes(NaN)).should.throw(Error);
        (() => shortToBytes(null)).should.not.throw(Error);
        (() => shortToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToShort', () => {
      it('works', () => {
        // bytesToUshort(buffer.toBuffer()).should.equal(number);
        bytesToUshort(buffer).should.equal(number);
      });
      it('invalid input', () => {
        should.not.exist(bytesToShort('string'));
        should.not.exist(bytesToShort(NaN));
        should.not.exist(bytesToShort(null));
        should.not.exist(bytesToShort());
      });
    });
  });
  describe('encode/decodeAttribute', () => {
    const testEncodeDecode = (value, type) => {
      const encoded = encodeAttribute(value);
      encoded.should.have.properties({ [`_${type}`]: { value } });
      decodeAttribute(encoded).should.have.properties({
        type,
        value,
      });
    };

    it('undefined/null/NaN', () => {
      should.not.exist(encodeAttribute());
      should.not.exist(encodeAttribute(undefined));
      should.not.exist(encodeAttribute(null));
      should.not.exist(encodeAttribute(NaN));

      // decode
      should.not.exist(decodeAttribute());
      should.not.exist(decodeAttribute(undefined));
      should.not.exist(decodeAttribute(null));
      should.not.exist(decodeAttribute(NaN));
    });
    describe('string', () => {
      it('empty', () => testEncodeDecode('', 'string'));
      it('ascii', () => testEncodeDecode('my string', 'string'));
      it('utf-8', () => testEncodeDecode('my rich strîng ☯ with utf-8 \u1F601', 'string'));
    });
    describe('number', () => {
      it('0', () => testEncodeDecode(0, 'ulong'));
      it('10', () => testEncodeDecode(10, 'ulong'));
      it('999999999999999', () => testEncodeDecode(999999999999999, 'ulong'));
      it('9999999999999999999', () => testEncodeDecode(9999999999999999999, 'ulong'));
      it('10.0', () => testEncodeDecode(10.0, 'ulong'));
      it('10.999999999999999', () => testEncodeDecode(10.999999999999999, 'double'));
      it('signed octeteger', () => testEncodeDecode(-10, 'long'));
      it('signed float', () => testEncodeDecode(-10.999, 'double'));

      // warning: limit of Javascript precision, get octeteger
      it('10.9999999999999999', () => testEncodeDecode(10.9999999999999999, 'ulong'));
    });
    describe('boolean', () => {
      it('true', () => testEncodeDecode(true, 'boolean'));
      it('false', () => testEncodeDecode(false, 'boolean'));
    });
    it('buffer', () => testEncodeDecode(new Buffer('foo'), 'blob'));
  });
});
