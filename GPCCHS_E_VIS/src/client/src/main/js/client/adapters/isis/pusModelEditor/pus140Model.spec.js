// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus140Model');
const stub = require('./pus140Model.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus140Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus140Model.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus140Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      status: { type: 'uinteger', value: stub.status },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus140Parameter).toHaveLength(stub.pus140Parameter.length);
    for (let i = 0; i < stub.pus140Parameter.length; i += 1) {
      expect(decoded.pus140Parameter[i]).toMatchObject({
        parameterId: { type: 'uinteger', value: stub.pus140Parameter[i].parameterId },
        serviceApid: { type: 'uinteger', value: stub.pus140Parameter[i].serviceApid },
        currentValue: { type: 'string', value: stub.pus140Parameter[i].currentValue },
        lastUpdateModeCurrentValue: { type: 'uinteger', value: stub.pus140Parameter[i].lastUpdateModeCurrentValue },
        lastUpdateTimeCurrentValue: { type: 'string', value: stub.pus140Parameter[i].lastUpdateTimeCurrentValue },
        lastUpdateModeParamId: { type: 'uinteger', value: stub.pus140Parameter[i].lastUpdateModeParamId },
        lastUpdateTimeParamId: { type: 'string', value: stub.pus140Parameter[i].lastUpdateTimeParamId },
        serviceApidName: { type: 'string', value: stub.pus140Parameter[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus140Parameter[i].uniqueId}` },
        parameterName: { type: 'string', value: stub.pus140Parameter[i].parameterName },
        initialValue: { type: 'string', value: stub.pus140Parameter[i].initialValue },
        status: { type: 'uinteger', value: stub.pus140Parameter[i].status },
      });
      
    }
  });
});
