// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./event');
const { getEvent } = require('../stubs');



describe('protobuf/isis/event/Event', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Event.proto`, { keepCase: true })
    .lookup('event.protobuf.Event');
  const fixture = getEvent();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      eventDate: { type: 'time', value: fixture.eventDate },
      systemDate: { type: 'time', value: fixture.systemDate },
      mission: { type: 'string', value: fixture.mission },
      satellite: { type: 'ulong', symbol: `${fixture.satellite}` },
      producer: {
        slotID: { type: 'ushort', value: fixture.producer.slotID },
        factoryID: { type: 'ushort', value: fixture.producer.factoryID },
        providerName: { type: 'string', value: fixture.producer.providerName },
        network: { type: 'uoctet', value: fixture.producer.network },
        session: { type: 'ulong', symbol: `${fixture.producer.session}` },
        serviceProperties: { type: 'uinteger', value: fixture.producer.serviceProperties },
        serviceAddress: {
          supportedCapabilities: { type: 'uinteger', value: fixture.producer.serviceAddress.supportedCapabilities },
          supportedLevels: { type: 'uinteger', value: fixture.producer.serviceAddress.supportedLevels },
          qoSproperties: { type: 'uinteger', value: fixture.producer.serviceAddress.qoSproperties },
          priorityLevels: { type: 'uinteger', value: fixture.producer.serviceAddress.priorityLevels },
          serviceURI: { type: 'uri', value: fixture.producer.serviceAddress.serviceURI },
          dataURI: { type: 'uri', value: fixture.producer.serviceAddress.dataURI },
          dataName: { type: 'string', value: fixture.producer.serviceAddress.dataName },
        },
        providerProperties: { type: 'string', value: fixture.producer.providerProperties },
        providerTime: { type: 'time', value: fixture.producer.providerTime },
      },
    });
    
    
  });
});
