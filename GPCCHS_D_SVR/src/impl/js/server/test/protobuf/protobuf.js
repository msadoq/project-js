require('../../lib/utils/test');

const protobuf = require('../../lib/protobuf');
// const stub = require('../../lib/utils/stub');

describe('protobuf', () => {
  const now = Date.now();
  describe('dc', () => {
    describe('DataQuery', () => {
      const fixture = {
        id: 'my_unique_id',
        dataId: {
          parameterName: 'ATT_BC_STR1STRRFQ1',
          catalog: 'Reporting',
          comObject: 'ReportingParameter',
          sessionId: 100,
          domainId: 200,
        },
        interval: {
          lower_ms: now,
          upper_ms: now,
        },
      };
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
      const fixture = {
        id: 'my_unique_id',
        status: 'ERROR',
        reason: 'My reason',
      };
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
    describe('DataId', () => {
      const fixture = {
        parameterName: 'ATT_BC_STR1STRRFQ1',
        oid: '46',
        catalog: 'Reporting',
        comObject: 'ReportingParameter',
        sessionId: 100,
        domainId: 200,
      };
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.DataId', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        protobuf.decode('dc.dataControllerUtils.DataId', buffer)
          .should.be.an('object')
          .that.have.properties(fixture);
      });
    });
    describe('Timestamp', () => {
      const fixture = {
        timestamp: now,
      };
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('dc.dataControllerUtils.Timestamp', fixture);
        buffer.constructor.should.equal(Buffer);
      });
      it('decode', () => {
        const json = protobuf.decode('dc.dataControllerUtils.Timestamp', buffer);
        json.should.be.an('object').that.have.property('timestamp')
          .that.equal(now); // should be strictly same type
      });
    });
  });
  describe('lpisis', () => {
    describe('ReportingParameter', () => {
      // const fixture = stub.getDcData().data;
      const fixture = {
        onboardDate: { value: now },
        groundDate: { value: Math.round(new Date().getTime() / 1000) },
        convertedValue: { _double: { value: Math.floor((Math.random() * 100) + 1) } },
        rawValue: { _double: { value: Math.floor((Math.random() * 100) + 1) } },
        extractedValue: { _double: { value: Math.floor((Math.random() * 100) + 1) } },
        triggerOnCounter: { value: '9' },
        triggerOffCounter: { value: '8' },
        monitoringState: 'INFORMATIONAL',
        validityState: 'INVALID',
        isObsolete: { value: false },
        isNominal: { value: false },
      };
      let buffer;
      it('encode', () => {
        buffer = protobuf.encode('lpisis.decommutedParameter.ReportingParameter', fixture);
        buffer.constructor.should.equal(Buffer);
      });

      // TODO : not working due to certain protobuf types (SHORT=bytes)
      // it('decode', () => {
      //   const json = protobuf.decode('lpisis.decommutedParameter.ReportingParameter', buffer);
      //   json.should.be.an('object').that.have.properties(fixture);
      // });
    });
  });
});
