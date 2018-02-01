// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cOP1Status');
const stub = require('./cOP1Status.stub')();

const decoderType = require('./decoderType');
const modeType = require('./modeType');

describe('protobuf/isis/cop1/COP1Status', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1Status.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1Status');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      mode: { type: 'enum', value: stub.mode, symbol: modeType[stub.mode] },
      decoder: { type: 'enum', value: stub.decoder, symbol: decoderType[stub.decoder] },
      state: { type: 'uoctet', value: stub.state },
      lockout_flag: { type: 'uoctet', value: stub.lockout_flag },
      wait_flag: { type: 'uoctet', value: stub.wait_flag },
      synchro_flag: { type: 'uoctet', value: stub.synchro_flag },
      rF_flag: { type: 'uoctet', value: stub.rF_flag },
      retransmit_flag: { type: 'uinteger', value: stub.retransmit_flag },
      farmB_counter: { type: 'uinteger', value: stub.farmB_counter },
      event: { type: 'uinteger', value: stub.event },
      cLCW: { type: 'uinteger', value: stub.cLCW },
      v_S: { type: 'uinteger', value: stub.v_S },
      v_R: { type: 'uinteger', value: stub.v_R },
      n_R: { type: 'uinteger', value: stub.n_R },
      nN_R: { type: 'integer', value: stub.nN_R },
      num_frame: { type: 'uinteger', value: stub.num_frame },
      type_frame: { type: 'enum', value: stub.type_frame, symbol: modeType[stub.type_frame] },
      nb_accepted_frames: { type: 'uinteger', value: stub.nb_accepted_frames },
      nb_confirmed_frames: { type: 'uinteger', value: stub.nb_confirmed_frames },
      nb_rejected_frames: { type: 'uinteger', value: stub.nb_rejected_frames },
      variable_display: { type: 'uoctet', value: stub.variable_display },
      frame_display: { type: 'uoctet', value: stub.frame_display },
    });
    
  });
});
