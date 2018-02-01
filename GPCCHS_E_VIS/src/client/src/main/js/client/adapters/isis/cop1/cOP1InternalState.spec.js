// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cOP1InternalState');
const stub = require('./cOP1InternalState.stub')();



describe('protobuf/isis/cop1/COP1InternalState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1InternalState.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1InternalState');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      stored_lockout_flag: { type: 'uoctet', value: stub.stored_lockout_flag },
      stored_wait_flag: { type: 'uoctet', value: stub.stored_wait_flag },
      stored_restransmit_flag: { type: 'uoctet', value: stub.stored_restransmit_flag },
      aD_out_flag: { type: 'uoctet', value: stub.aD_out_flag },
      v_S_nbmod: { type: 'uinteger', value: stub.v_S_nbmod },
      bC_out_flag: { type: 'uoctet', value: stub.bC_out_flag },
      bD_out_flag: { type: 'uoctet', value: stub.bD_out_flag },
      nN_R_nbmod: { type: 'uinteger', value: stub.nN_R_nbmod },
      transmission_limit: { type: 'uinteger', value: stub.transmission_limit },
      timeout_type: { type: 'uinteger', value: stub.timeout_type },
      transmission_count: { type: 'uinteger', value: stub.transmission_count },
      sliding_window_width: { type: 'uinteger', value: stub.sliding_window_width },
      t1_initial: { type: 'float', value: stub.t1_initial },
      regulation_tc_delay: { type: 'float', value: stub.regulation_tc_delay },
      suspend_state: { type: 'uoctet', value: stub.suspend_state },
      v_S: { type: 'uinteger', value: stub.v_S },
      state: { type: 'uinteger', value: stub.state },
      nN_R: { type: 'integer', value: stub.nN_R },
    });
    
  });
});
