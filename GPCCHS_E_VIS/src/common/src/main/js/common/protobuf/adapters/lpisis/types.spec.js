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

describe('protobuf/lpisis/types', () => {
  describe('uoctetToBytes/bytesToUoctet', () => {
    const numberPositive = 21;
    const numberNegative = -21;
    const numberOverflow = 256;
    let bufferPositive;
    let bufferNegative;
    let bufferOverflow;
    describe('uoctetToBytes', () => {
      it('works', () => {
        bufferPositive = uoctetToBytes(numberPositive);
        bufferNegative = uoctetToBytes(numberNegative);
        bufferOverflow = uoctetToBytes(numberOverflow);
        // (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => uoctetToBytes('string')).should.throw(Error);
        (() => uoctetToBytes(NaN)).should.throw(Error);
        (() => uoctetToBytes(null)).should.not.throw(Error);
        (() => uoctetToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToUoctet', () => {
      it('works with positive value', () => {
        bytesToUoctet(bufferPositive).should.equal(numberPositive);
      });
      it('invalid input', () => {
        should.not.exist(bytesToUoctet(NaN));
        should.not.exist(bytesToUoctet(null));
        should.not.exist(bytesToUoctet());
      });
      it('should not work with negative value', () => {
        bytesToUoctet(bufferNegative).should.not.equal(numberNegative);
      });
      it('should not work with out of range number', () => {
        bytesToUoctet(bufferOverflow).should.not.equal(numberOverflow);
      });
    });
  });
  describe('octetToBytes/bytesToOctet', () => {
    const numberPositive = 21;
    const numberNegative = -21;
    const numberOverflow = 128;
    let bufferPositive;
    let bufferNegative;
    let bufferOverflow;
    describe('octetToBytes', () => {
      it('works', () => {
        bufferPositive = octetToBytes(numberPositive);
        bufferNegative = octetToBytes(numberNegative);
        bufferOverflow = octetToBytes(numberOverflow);
        // (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => octetToBytes('string')).should.throw(Error);
        (() => octetToBytes(NaN)).should.throw(Error);
        (() => octetToBytes(null)).should.not.throw(Error);
        (() => octetToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToOctet', () => {
      it('works with positive value', () => {
        bytesToOctet(bufferPositive).should.equal(numberPositive);
      });
      it('invalid input', () => {
        should.not.exist(bytesToOctet('string'));
        should.not.exist(bytesToOctet(NaN));
        should.not.exist(bytesToOctet(null));
        should.not.exist(bytesToOctet());
      });
      it('works with negative value', () => {
        bytesToOctet(bufferNegative).should.equal(numberNegative);
      });
      it('should not work with out of range number', () => {
        bytesToOctet(bufferOverflow).should.not.equal(numberOverflow);
      });
    });
  });
  describe('ushortToBytes/bytesToUshort', () => {
    const numberPositive = 21;
    const numberNegative = -21;
    const numberOverflow = 65536;
    let bufferPositive;
    let bufferNegative;
    let bufferOverflow;
    describe('ushortToBytes', () => {
      it('works', () => {
        bufferPositive = ushortToBytes(numberPositive);
        bufferNegative = ushortToBytes(numberNegative);
        bufferOverflow = ushortToBytes(numberOverflow);
        // (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => ushortToBytes('string')).should.throw(Error);
        (() => ushortToBytes(NaN)).should.throw(Error);
        (() => ushortToBytes(null)).should.not.throw(Error);
        (() => ushortToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToUshort', () => {
      it('works with positive value', () => {
        // bytesToUshort(buffer.toBuffer()).should.equal(number);
        bytesToUshort(bufferPositive).should.equal(numberPositive);
      });
      it('invalid input', () => {
        should.not.exist(bytesToUshort('string'));
        should.not.exist(bytesToUshort(NaN));
        should.not.exist(bytesToUshort(null));
        should.not.exist(bytesToUshort());
      });
      it('not works with negative value', () => {
        bytesToUshort(bufferNegative).should.not.equal(numberNegative);
      });
      it('should not work with out of range number', () => {
        bytesToUshort(bufferOverflow).should.not.equal(numberOverflow);
      });
    });
  });
  describe('shortToBytes/bytesToShort', () => {
    const numberPositive = 21;
    const numberNegative = -21;
    const numberOverflow = 32768;
    let bufferPositive;
    let bufferNegative;
    let bufferOverflow;
    describe('shortToBytes', () => {
      it('works', () => {
        bufferPositive = shortToBytes(numberPositive);
        bufferNegative = shortToBytes(numberNegative);
        bufferOverflow = shortToBytes(numberOverflow);
        // (ByteBuffer.isByteBuffer(buffer)).should.equal(true);
      });
      it('invalid input', () => {
        (() => shortToBytes('string')).should.throw(Error);
        (() => shortToBytes(NaN)).should.throw(Error);
        (() => shortToBytes(null)).should.not.throw(Error);
        (() => shortToBytes()).should.not.throw(Error);
      });
    });
    describe('bytesToShort', () => {
      it('works with positive value', () => {
        // bytesToUshort(buffer.toBuffer()).should.equal(number);
        bytesToShort(bufferPositive).should.equal(numberPositive);
      });
      it('invalid input', () => {
        should.not.exist(bytesToShort('string'));
        should.not.exist(bytesToShort(NaN));
        should.not.exist(bytesToShort(null));
        should.not.exist(bytesToShort());
      });
      it('not works with negative value', () => {
        bytesToShort(bufferNegative).should.equal(numberNegative);
      });
      it('should not work with out of range number', () => {
        bytesToShort(bufferOverflow).should.not.equal(numberOverflow);
      });
    });
  });
  describe('encode/decodeAttribute', () => {
    const testEncodeDecode = (value, type) => {
      const encoded = encodeAttribute(value);
      encoded.should.have.properties({ [`_${type}`]: { value } });
      if (type === 'double') {
        decodeAttribute(encoded).should.have.properties({
          type,
          symbol: value.toString(),
        });
      } else {
        decodeAttribute(encoded).should.have.properties({
          type,
          value,
        });
      }
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
    it('buffer', () => testEncodeDecode(Buffer.from('foo'), 'blob'));
  });
});
