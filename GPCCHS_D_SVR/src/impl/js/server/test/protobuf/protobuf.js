const { should } = require('../../lib/utils/test');

const protobuf = require('../../lib/protobuf');
const {
  encodeAttribute,
  decodeAttribute,
  uintToBytes,
  bytesToUint,
} = require('../../lib/protobuf/converters/lpisis/types');
const stub = require('../../lib/utils/stubData');
const ByteBuffer = require('bytebuffer');

describe('protobuf', () => {
  describe('dc', () => {
    describe('DataQuery', () => {
      const fixture = stub.getDataQuery();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DataQuery', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DataQuery', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('DcResponse', () => {
      const fixture = stub.getDcResponse();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DcResponse', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DcResponse', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('DataSubscribe', () => {
      const fixture = stub.getDataSubscribe();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DataSubscribe', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DataSubscribe', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('newDataMessage', () => {
      const fixture = stub.getNewDataMessage({
        payloads: [
          {
            timestamp: { ms: 100000000 },
            payload: protobuf.encode(
              'lpisis.decommutedParameter.ReportingParameter',
              stub.getReportingParameter({ convertedValue: 35 })
            ),
          },
          {
            timestamp: { ms: 100000010 },
            payload: protobuf.encode(
              'lpisis.decommutedParameter.ReportingParameter',
              stub.getReportingParameter({ convertedValue: 50 })
            ),
          },
        ],
      });
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.NewDataMessage', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.NewDataMessage', buffer);
        json.should.be.an('object').that.have.properties(fixture);
        protobuf.decode('lpisis.decommutedParameter.ReportingParameter', json.payloads[0].payload)
          .should.be.an('object').with.property('convertedValue', 35);
        protobuf.decode('lpisis.decommutedParameter.ReportingParameter', json.payloads[1].payload)
          .should.be.an('object').with.property('convertedValue', 50);
      });
    });
  });
  describe('lpisis', () => {
    describe('ReportingParameter', () => {
      const fixture = stub.getReportingParameter();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('lpisis.decommutedParameter.ReportingParameter', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('lpisis.decommutedParameter.ReportingParameter', buffer);
        json.should.be.an('object').that.have.properties(fixture);
        json.getReferenceTimestamp().should.equal(json.onboardDate);
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
          bytesToUint(buffer.toBuffer()).should.equal(number);
        });
        it('invalid input', () => {
          should.not.exist(bytesToUint('string'));
          should.not.exist(bytesToUint(NaN));
          should.not.exist(bytesToUint(null));
          should.not.exist(bytesToUint());
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
