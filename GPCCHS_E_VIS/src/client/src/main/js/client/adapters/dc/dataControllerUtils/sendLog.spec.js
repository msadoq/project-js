// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const adapter = require('./sendLog');
const stub = require('./sendLog.stub');


describe('protobuf/utils/dataControllerUtils/sendLog', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SendLog.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.SendLog');
  const fixture = stub.getSendLog();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toHaveProperty('uid',fixture.uid);

    for (let i = 0; i < fixture.arguments.length; i += 1) {
      expect(decoded.arguments[i]).toHaveProperty('type','string');
      expect(decoded.arguments[i]).toHaveProperty('value',fixture.arguments[i]);
    }
    
  });
});
