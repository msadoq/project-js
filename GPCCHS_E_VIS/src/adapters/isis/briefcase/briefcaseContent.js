// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const objectId = require('../ccsds_com/objectId');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    author: (data.author !== null && typeof data.author !== 'undefined')
      ? bLOB.encode(objectId.encodeRaw(data.author))
      : null,
    title: (data.title !== null && typeof data.title !== 'undefined')
      ? sTRING.encode(data.title)
      : null,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.encode(data.description)
      : null,
    link: _map(data.link, d => (bLOB.encode(objectId.encodeRaw(d)))),
  }),
  decode: data => ({
    author: (data.author !== null && typeof data.author !== 'undefined')
      ? objectId.decodeRaw(bLOB.decode(data.author).value)
      : undefined,
    title: (data.title !== null && typeof data.title !== 'undefined')
      ? sTRING.decode(data.title)
      : undefined,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.decode(data.description)
      : undefined,
    link: _map(data.link, d => (objectId.decodeRaw(bLOB.decode(d).value))),
  }),
};
