// Produced by Acceleo JavaScript Generator 1.1.0
const flagVal = require('./flagVal');
const sequenceType = require('./sequenceType');

module.exports = {
  encode: data => ({
    sequence_flag: (data.sequence_flag !== null && typeof data.sequence_flag !== 'undefined')
      ? { value: data.sequence_flag }
      : null,
    sequence_type: (data.sequence_type !== null && typeof data.sequence_type !== 'undefined')
      ? data.sequence_type
      : null,
    map: (data.map !== null && typeof data.map !== 'undefined')
      ? flagVal.encode(data.map)
      : null,
    word_type: (data.word_type !== null && typeof data.word_type !== 'undefined')
      ? flagVal.encode(data.word_type)
      : null,
    vc_id: (data.vc_id !== null && typeof data.vc_id !== 'undefined')
      ? flagVal.encode(data.vc_id)
      : null,
    farm_B_counter: (data.farm_B_counter !== null && typeof data.farm_B_counter !== 'undefined')
      ? flagVal.encode(data.farm_B_counter)
      : null,
    RF_flag: (data.RF_flag !== null && typeof data.RF_flag !== 'undefined')
      ? flagVal.encode(data.RF_flag)
      : null,
    synchro_flag: (data.synchro_flag !== null && typeof data.synchro_flag !== 'undefined')
      ? flagVal.encode(data.synchro_flag)
      : null,
    close_flag: (data.close_flag !== null && typeof data.close_flag !== 'undefined')
      ? flagVal.encode(data.close_flag)
      : null,
    wait_flag: (data.wait_flag !== null && typeof data.wait_flag !== 'undefined')
      ? flagVal.encode(data.wait_flag)
      : null,
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? flagVal.encode(data.retransmit_flag)
      : null,
    report: (data.report !== null && typeof data.report !== 'undefined')
      ? flagVal.encode(data.report)
      : null,
    version_name: (data.version_name !== null && typeof data.version_name !== 'undefined')
      ? flagVal.encode(data.version_name)
      : null,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? flagVal.encode(data.state)
      : null,
    cop: (data.cop !== null && typeof data.cop !== 'undefined')
      ? flagVal.encode(data.cop)
      : null,
  }),
  decode: data => ({
    sequence_flag: (data.sequence_flag !== null && typeof data.sequence_flag !== 'undefined')
      ? { type: 'boolean', value: data.sequence_flag.value }
      : undefined,
    sequence_type: (data.sequence_type !== null && typeof data.sequence_type !== 'undefined')
      ? { type: 'enum', value: data.sequence_type, symbol: sequenceType[data.sequence_type] }
      : undefined,
    map: (data.map !== null && typeof data.map !== 'undefined')
      ? flagVal.decode(data.map)
      : undefined,
    word_type: (data.word_type !== null && typeof data.word_type !== 'undefined')
      ? flagVal.decode(data.word_type)
      : undefined,
    vc_id: (data.vc_id !== null && typeof data.vc_id !== 'undefined')
      ? flagVal.decode(data.vc_id)
      : undefined,
    farm_B_counter: (data.farm_B_counter !== null && typeof data.farm_B_counter !== 'undefined')
      ? flagVal.decode(data.farm_B_counter)
      : undefined,
    RF_flag: (data.RF_flag !== null && typeof data.RF_flag !== 'undefined')
      ? flagVal.decode(data.RF_flag)
      : undefined,
    synchro_flag: (data.synchro_flag !== null && typeof data.synchro_flag !== 'undefined')
      ? flagVal.decode(data.synchro_flag)
      : undefined,
    close_flag: (data.close_flag !== null && typeof data.close_flag !== 'undefined')
      ? flagVal.decode(data.close_flag)
      : undefined,
    wait_flag: (data.wait_flag !== null && typeof data.wait_flag !== 'undefined')
      ? flagVal.decode(data.wait_flag)
      : undefined,
    retransmit_flag: (data.retransmit_flag !== null && typeof data.retransmit_flag !== 'undefined')
      ? flagVal.decode(data.retransmit_flag)
      : undefined,
    report: (data.report !== null && typeof data.report !== 'undefined')
      ? flagVal.decode(data.report)
      : undefined,
    version_name: (data.version_name !== null && typeof data.version_name !== 'undefined')
      ? flagVal.decode(data.version_name)
      : undefined,
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? flagVal.decode(data.state)
      : undefined,
    cop: (data.cop !== null && typeof data.cop !== 'undefined')
      ? flagVal.decode(data.cop)
      : undefined,
  }),
};

