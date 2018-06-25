// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const lONG = require('../ccsds_mal/lONG');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    docPath: (data.docPath !== null && typeof data.docPath !== 'undefined')
      ? sTRING.encode(data.docPath)
      : null,
    docId: (data.docId !== null && typeof data.docId !== 'undefined')
      ? lONG.encode(data.docId)
      : null,
    parentDocId: (data.parentDocId !== null && typeof data.parentDocId !== 'undefined')
      ? lONG.encode(data.parentDocId)
      : null,
  }),
  decode: data => ({
    docPath: (data.docPath !== null && typeof data.docPath !== 'undefined')
      ? sTRING.decode(data.docPath)
      : undefined,
    docId: (data.docId !== null && typeof data.docId !== 'undefined')
      ? lONG.decode(data.docId)
      : undefined,
    parentDocId: (data.parentDocId !== null && typeof data.parentDocId !== 'undefined')
      ? lONG.decode(data.parentDocId)
      : undefined,
  }),
};
