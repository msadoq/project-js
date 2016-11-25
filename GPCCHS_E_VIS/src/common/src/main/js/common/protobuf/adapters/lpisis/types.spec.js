const { should } = require('../../../utils/test');
const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,
  shortToBytes,
  bytesToShort,
  uintToBytes,
  bytesToUint,
  intToBytes,
  bytesToInt,
} = require('./types');
const ByteBuffer = require('bytebuffer');

describe('protobuf/lpisis/types', () => {
  describe('uintToBytes/bytesToUint', () => {
    const number = 21;
    let buffer;
    describe('uintToBytes', () => {
      it('works', () => {
        buffer = uintToBytes(number);
        (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => uintToBytes('string')).should.throw(Error);
        (() => uintToBytes(NaN)).should.throw(Error);
        (() => uintToBytes(null)).should.not.throw(Error);
        (() => uintToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToUint', () => {
      it('works', () => {
        bytesToUint(buffer).should.equal(number);
      });
      it('invalid input', () => {
        should.not.exist(bytesToUint('string'));
        should.not.exist(bytesToUint(NaN));
        should.not.exist(bytesToUint(null));
        should.not.exist(bytesToUint());
      });
    });
  });
  describe('intToBytes/bytesToInt', () => {
    const number = 21;
    let buffer;
    describe('intToBytes', () => {
      it('works', () => {
        buffer = intToBytes(number);
        (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => intToBytes('string')).should.throw(Error);
        (() => intToBytes(NaN)).should.throw(Error);
        (() => intToBytes(null)).should.not.throw(Error);
        (() => intToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToInt', () => {
      it('works', () => {
        bytesToInt(buffer).should.equal(number);
      });
      it('invalid input', () => {
        should.not.exist(bytesToInt('string'));
        should.not.exist(bytesToInt(NaN));
        should.not.exist(bytesToInt(null));
        should.not.exist(bytesToInt());
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
      it('signed integer', () => testEncodeDecode(-10, 'long'));
      it('signed float', () => testEncodeDecode(-10.999, 'double'));

      // warning: limit of Javascript precision, get integer
      it('10.9999999999999999', () => testEncodeDecode(10.9999999999999999, 'ulong'));
    });
    describe('boolean', () => {
      it('true', () => testEncodeDecode(true, 'boolean'));
      it('false', () => testEncodeDecode(false, 'boolean'));
    });
    it('buffer', () => testEncodeDecode(new Buffer('foo'), 'blob'));
  });
});
