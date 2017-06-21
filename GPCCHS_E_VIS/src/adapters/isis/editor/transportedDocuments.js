// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const documentValue = require('./documentValue');

module.exports = {
  encode: data => ({
    documents: _map(data.documents, d => (documentValue.encode(d))),
  }),
  decode: data => ({
    documents: _map(data.documents, d => (documentValue.decode(d))),
  }),
};
