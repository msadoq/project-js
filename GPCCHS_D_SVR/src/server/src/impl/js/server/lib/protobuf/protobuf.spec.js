const { should } = require('../utils/test');
const protobuf = require('./index');
const {
  encodeAttribute,
  decodeAttribute,
  ushortToBytes,
  bytesToUshort,
  uintToBytes,
  bytesToUint,
} = require('./converters/lpisis/types');
const stubData = require('../stubs/data');
const ByteBuffer = require('bytebuffer');


describe('protobuf', () => {
  describe('dc', () => {
    describe('Action', () => {
      const fixture = stubData.getAddAction();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Action', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Action', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('Boolean', () => {
      const fixture = stubData.getBoolean();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Boolean', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Boolean', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('DataId', () => {
      const fixture = stubData.getDataId();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DataId', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DataId', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('Domain', () => {
      const fixture = stubData.getDomain();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Domain', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Domain', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('Filter', () => {
      const fixture = stubData.getFilter();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Filter', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Filter', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('Header', () => {
      const fixture = stubData.getTimebasedQueryHeader();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Header', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Header', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('QueryArguments', () => {
      const fixture = stubData.getQueryArguments();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.QueryArguments', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.QueryArguments', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('Status', () => {
      const fixture = stubData.getSuccessStatus();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Status', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Status', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('String', () => {
      const fixture = stubData.getString();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.String', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.String', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('TimeInterval', () => {
      const fixture = stubData.getTimeInterval();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.TimeInterval', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.TimeInterval', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('Timestamp', () => {
      const fixture = stubData.getTimestamp();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Timestamp', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Timestamp', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
  });
  describe('lpisis', () => {
    describe('ReportingParameter', () => {
      const fixture = stubData.getReportingParameter();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('lpisis.decommutedParameter.ReportingParameter', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('lpisis.decommutedParameter.ReportingParameter', buffer);
        json.should.be.an('object').that.have.properties(fixture);
        json.referenceTimestamp.should.equal(json.onboardDate);
      });
    });
  });
  describe('utils', () => {
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
    describe('encode/decodeAttribute', () => {
      const testEncodeDecode = (value, type) => {
        const encoded = encodeAttribute(value);
        encoded.should.have.properties({ [type]: { value } });
        decodeAttribute(encoded).should.equal(value);
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
        it('empty', () => testEncodeDecode('', '_string'));
        it('ascii', () => testEncodeDecode('my string', '_string'));
        it('utf-8', () => testEncodeDecode('my rich strîng ☯ with utf-8 \u1F601', '_string'));
      });
      describe('number', () => {
        it('0', () => testEncodeDecode(0, '_uinteger'));
        it('10', () => testEncodeDecode(10, '_uinteger'));
        it('999999999999999', () => testEncodeDecode(999999999999999, '_uinteger'));
        it('9999999999999999999', () => testEncodeDecode(9999999999999999999, '_uinteger'));
        it('10.0', () => testEncodeDecode(10.0, '_uinteger'));
        it('10.999999999999999', () => testEncodeDecode(10.999999999999999, '_double'));
        it('signed integer', () => testEncodeDecode(-10, '_integer'));
        it('signed float', () => testEncodeDecode(-10.999, '_double'));

        // warning: limit of Javascript precision, get integer
        it('10.9999999999999999', () => testEncodeDecode(10.9999999999999999, '_uinteger'));
      });
      describe('boolean', () => {
        it('true', () => testEncodeDecode(true, '_boolean'));
        it('false', () => testEncodeDecode(false, '_boolean'));
      });
      it('buffer', () => testEncodeDecode(new Buffer('foo'), '_blob'));
    });
  });
});
