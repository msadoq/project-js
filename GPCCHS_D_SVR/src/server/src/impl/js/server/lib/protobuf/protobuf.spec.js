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
    describe('DataPayload', () => {
      const fixture = stubData.getDataPayload();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DataPayload', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DataPayload', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('DataQuery', () => {
      const fixture = stubData.getDataQuery();
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
    describe('DataSubscribe', () => {
      const fixture = stubData.getDataSubscribe();
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
    describe('DcClientMessage', () => {
      const fixtureWrappedDataQuery = stubData.getWrappedDataQuery();
      const fixtureWrappedDataSubscribe = stubData.getWrappedDataSubscribe();
      const fixtureWrappedDomainQuery = stubData.getWrappedDomainQuery();
      let bufferDataQuery;
      let bufferDataSubscribe;
      let bufferDomainQuery;
      it('encode', () => {
        bufferDataQuery = protobuf.encode(
          'dc.dataControllerUtils.DcClientMessage',
          fixtureWrappedDataQuery
        );
        bufferDataQuery.constructor.should.equal(Buffer);
        bufferDataSubscribe = protobuf.encode(
          'dc.dataControllerUtils.DcClientMessage',
          fixtureWrappedDataSubscribe
        );
        bufferDataSubscribe.constructor.should.equal(Buffer);
        bufferDomainQuery = protobuf.encode(
          'dc.dataControllerUtils.DcClientMessage',
          fixtureWrappedDomainQuery
        );
        bufferDomainQuery.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        let json = protobuf.decode('dc.dataControllerUtils.DcClientMessage', bufferDataQuery);
        json.should.be.an('object').that.have.properties(fixtureWrappedDataQuery);
        json = protobuf.decode('dc.dataControllerUtils.DcClientMessage', bufferDataSubscribe);
        json.should.be.an('object').that.have.properties(fixtureWrappedDataSubscribe);
        json = protobuf.decode('dc.dataControllerUtils.DcClientMessage', bufferDomainQuery);
        json.should.be.an('object').that.have.properties(fixtureWrappedDomainQuery);
      });
    });
    describe('DcResponse', () => {
      const fixture = stubData.getDcResponse();
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
    describe('DcServerMessage', () => {
      const fixtureWrappedNewData = stubData.getWrappedNewDataMessage();
      const fixtureWrappedDomainResp = stubData.getWrappedDomainResponse();
      const fixtureWrappedDcResponse = stubData.getWrappedDcResponse();
      let bufferNewData;
      let bufferDomainResponse;
      let bufferDcResponse;

      it('encode', () => {
        bufferNewData = protobuf.encode(
          'dc.dataControllerUtils.DcServerMessage',
          fixtureWrappedNewData
        );
        bufferNewData.constructor.should.equal(Buffer);
        bufferDomainResponse = protobuf.encode(
          'dc.dataControllerUtils.DcServerMessage',
          fixtureWrappedDomainResp
        );
        bufferDomainResponse.constructor.should.equal(Buffer);
        bufferDcResponse = protobuf.encode(
          'dc.dataControllerUtils.DcServerMessage',
          fixtureWrappedDcResponse
        );
        bufferDcResponse.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        let json = protobuf.decode('dc.dataControllerUtils.DcServerMessage', bufferNewData);
        json.should.be.an('object').that.have.properties(fixtureWrappedNewData);
        json = protobuf.decode('dc.dataControllerUtils.DcServerMessage', bufferDomainResponse);
        json.should.be.an('object').that.have.properties(fixtureWrappedDomainResp);
        json = protobuf.decode('dc.dataControllerUtils.DcServerMessage', bufferDcResponse);
        json.should.be.an('object').that.have.properties(fixtureWrappedDcResponse);
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
    describe('DomainQuery', () => {
      const fixture = stubData.getDomainQuery();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DomainQuery', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DomainQuery', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('DomainResponse', () => {
      const fixture = stubData.getDomainResponse();
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DomainResponse', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.DomainResponse', buffer);
        json.should.be.an('object').that.have.properties(fixture);
      });
    });
    describe('NewDataMessage', () => {
      const fixture = stubData.getNewDataMessage({
        payloads: [
          {
            timestamp: { ms: 100000000 },
            payload: protobuf.encode(
              'lpisis.decommutedParameter.ReportingParameter',
              stubData.getReportingParameter({ convertedValue: 35 })
            ),
          },
          {
            timestamp: { ms: 100000010 },
            payload: protobuf.encode(
              'lpisis.decommutedParameter.ReportingParameter',
              stubData.getReportingParameter({ convertedValue: 50 })
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
          bytesToUshort(buffer.toBuffer()).should.equal(number);
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
