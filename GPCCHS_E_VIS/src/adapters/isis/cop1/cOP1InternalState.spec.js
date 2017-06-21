// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1InternalState');
const { getCOP1InternalState } = require('../stubs');



describe('protobuf/isis/cop1/COP1InternalState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1InternalState.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1InternalState');
  const fixture = getCOP1InternalState();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      stored_lockout_flag: { type: 'uoctet', value: fixture.stored_lockout_flag },
      stored_wait_flag: { type: 'uoctet', value: fixture.stored_wait_flag },
      stored_restransmit_flag: { type: 'uoctet', value: fixture.stored_restransmit_flag },
      aD_out_flag: { type: 'uoctet', value: fixture.aD_out_flag },
      v_S_nbmod: { type: 'uinteger', value: fixture.v_S_nbmod },
      bC_out_flag: { type: 'uoctet', value: fixture.bC_out_flag },
      bD_out_flag: { type: 'uoctet', value: fixture.bD_out_flag },
      nN_R_nbmod: { type: 'uinteger', value: fixture.nN_R_nbmod },
      transmission_limit: { type: 'uinteger', value: fixture.transmission_limit },
      timeout_type: { type: 'uinteger', value: fixture.timeout_type },
      transmission_count: { type: 'uinteger', value: fixture.transmission_count },
      sliding_window_width: { type: 'uinteger', value: fixture.sliding_window_width },
      t1_initial: { type: 'float', value: fixture.t1_initial },
      regulation_tc_delay: { type: 'float', value: fixture.regulation_tc_delay },
      suspend_state: { type: 'uoctet', value: fixture.suspend_state },
      v_S: { type: 'uinteger', value: fixture.v_S },
      state: { type: 'uinteger', value: fixture.state },
      nN_R: { type: 'integer', value: fixture.nN_R },
    });
    
    
  });
});
