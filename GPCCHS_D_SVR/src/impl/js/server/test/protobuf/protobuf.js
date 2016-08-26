require('../../lib/utils/test');

const protobuf = require('../../lib/protobuf');

describe('protobuf', () => {
  const now = Date.now();
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
      buffer = protobuf.encode('DataQuery', fixture);
      buffer.constructor.should.equal(Buffer);
    });
    it('decode', () => {
      const json = protobuf.decode('DataQuery', buffer);
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
      buffer = protobuf.encode('DcResponse', fixture);
      buffer.constructor.should.equal(Buffer);
    });
    it('decode', () => {
      const json = protobuf.decode('DcResponse', buffer);
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
      buffer = protobuf.encode('DataId', fixture);
      buffer.constructor.should.equal(Buffer);
    });
    it('decode', () => {
      protobuf.decode('DataId', buffer)
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
      buffer = protobuf.encode('Timestamp', fixture);
      buffer.constructor.should.equal(Buffer);
    });
    it('decode', () => {
      const json = protobuf.decode('Timestamp', buffer);
      json.should.be.an('object').that.have.property('timestamp')
        .that.equal(now); // should be strictly same type
    });
  });
});
