// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1Status');
const { getCOP1Status } = require('../stubs');

const decoderType = require('./decoderType');
const modeType = require('./modeType');

describe('protobuf/isis/cop1/COP1Status', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1Status.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1Status');
  const fixture = getCOP1Status();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      mode: { type: 'enum', value: fixture.mode, symbol: modeType[fixture.mode] },
      decoder: { type: 'enum', value: fixture.decoder, symbol: decoderType[fixture.decoder] },
      state: { type: 'uoctet', value: fixture.state },
      lockout_flag: { type: 'uoctet', value: fixture.lockout_flag },
      wait_flag: { type: 'uoctet', value: fixture.wait_flag },
      synchro_flag: { type: 'uoctet', value: fixture.synchro_flag },
      rF_flag: { type: 'uoctet', value: fixture.rF_flag },
      retransmit_flag: { type: 'uinteger', value: fixture.retransmit_flag },
      farmB_counter: { type: 'uinteger', value: fixture.farmB_counter },
      event: { type: 'uinteger', value: fixture.event },
      cLCW: { type: 'uinteger', value: fixture.cLCW },
      v_S: { type: 'uinteger', value: fixture.v_S },
      v_R: { type: 'uinteger', value: fixture.v_R },
      n_R: { type: 'uinteger', value: fixture.n_R },
      nN_R: { type: 'integer', value: fixture.nN_R },
      num_frame: { type: 'uinteger', value: fixture.num_frame },
      type_frame: { type: 'enum', value: fixture.type_frame, symbol: modeType[fixture.type_frame] },
      nb_accepted_frames: { type: 'uinteger', value: fixture.nb_accepted_frames },
      nb_confirmed_frames: { type: 'uinteger', value: fixture.nb_confirmed_frames },
      nb_rejected_frames: { type: 'uinteger', value: fixture.nb_rejected_frames },
      variable_display: { type: 'uoctet', value: fixture.variable_display },
      frame_display: { type: 'uoctet', value: fixture.frame_display },
    });
    
    
  });
});
