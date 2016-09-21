require('../utils/test');
const { decode } = require('../protobuf');
const connectedDataModel = require('../models/connectedData');
const { startConnectedDataSubscription } = require('./onConnectedDataOpen');

describe('onConnectedDataOpen', () => {
  beforeEach(() => {
    connectedDataModel.chain().find().remove();
  });
  it('messageHandler error', () => {
    (() => startConnectedDataSubscription(
      { id: 'test' },
      {
        parameterName: 'ATT_BC_STR1VOLTAGE',
        catalog: 'Reporting',
        comObject: 'ReportingParameter',
        domainId: 12345,
        sessionId: 6789,
      },
      (key, buffer, callback) => {
        callback(new Error());
      }
    )).should.throw(Error);
    const connectedData = connectedDataModel.find();
    connectedData.should.be.an('array')
      .that.have.lengthOf(1);
    connectedData[0].should.be.an('object')
      .that.have.properties({
        // TODO deal with dataId when possible
        intervals: [],
        requested: {},
        windows: [],
      });
  });
  it('start subscription', () => {
    startConnectedDataSubscription(
      { id: 'test' },
      {
        windowId: 'windowId',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        catalog: 'Reporting',
        comObject: 'ReportingParameter',
        domainId: 12345,
        sessionId: 6789,
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
          .that.equal('ADD');
        payload.should.have.an.property('id');
        payload.should.have.an.property('dataId')
          .that.be.an('object');
        payload.dataId.should.have.properties({
          parameterName: 'ATT_BC_STR1VOLTAGE',
          catalog: 'Reporting',
          comObject: 'ReportingParameter',
        });
        // TODO check payload.dataId.sessionId and payload.dataId.domainId when implemented
        const connectedData = connectedDataModel.find();
        connectedData.should.be.an('array')
          .that.have.lengthOf(1);
        connectedData[0].should.be.an('object')
          .that.have.properties({
            // TODO deal with dataId when possible
            intervals: [],
            requested: {},
            windows: ['windowId'],
          });
        callback(null);
      }
    );
  });
});
