// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./statisticLinkStruct');
const { getStatisticLinkStruct } = require('../stubs');



describe('protobuf/isis/ccsds_mc/StatisticLinkStruct', () => {
  const fixture = getStatisticLinkStruct();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      collectionInterval: { type: 'duration', value: fixture.collectionInterval },
      reportingInterval: { type: 'duration', value: fixture.reportingInterval },
      samplingInterval: { type: 'duration', value: fixture.samplingInterval },
      reportingEnabled: { type: 'boolean', value: fixture.reportingEnabled },
      startTime: { type: 'time', value: fixture.startTime },
    });
    
  });
});
