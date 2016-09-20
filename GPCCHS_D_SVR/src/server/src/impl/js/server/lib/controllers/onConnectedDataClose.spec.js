require('../utils/test');
const formula = require('../utils/formula');
const { decode } = require('../protobuf');
// const stubData = require('../stubs/data');
const { endConnectedDataSubscription } = require('./onConnectedDataClose');

describe('onConnectedDataClose', () => {
  it('messageHandler error', () => {
    const dataFormula = 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.convertedValue';
    (() => endConnectedDataSubscription(
      { id: 'test' },
      {
        formula: dataFormula,
        domain: '.*',
        timeline: 'Session 1',
        windowId: 42,
      },
      (key, buffer, callback) => {
        callback(new Error());
      }
    )).should.throw(Error);
  });
  it('end subscription', () => {
    const dataFormula = 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.convertedValue';
    endConnectedDataSubscription(
      { id: 'test' },
      {
        formula: dataFormula,
        domain: '.*',
        timeline: 'Session 1',
        windowId: 42,
      },
      (key, buffer, callback) => {
        key.should.be.an('string')
          .that.equal('dcPush');
        buffer.constructor.should.equal(Buffer);
        const subscription = decode('dc.dataControllerUtils.DcClientMessage', buffer);
        subscription.should.be.an('object')
          .that.have.an.property('messageType')
          .that.equal('DATA_SUBSCRIBE');
        subscription.should.have.an.property('payload');
        subscription.payload.constructor.should.equal(Buffer);
        const payload = decode('dc.dataControllerUtils.DataSubscribe', subscription.payload);
        payload.should.be.an('object')
          .that.have.an.property('action')
          .that.equal('DELETE');
        payload.should.have.an.property('dataId')
          .that.be.an('object');
        const data = formula(dataFormula);
        payload.dataId.should.have.properties({
          parameterName: data.parameterName,
          catalog: data.catalog,
          comObject: data.comObject,
        });
        // TODO check payload.dataId.sessionId and payload.dataId.domainId when implemented
        callback(null);
      }
    );
  });
});
