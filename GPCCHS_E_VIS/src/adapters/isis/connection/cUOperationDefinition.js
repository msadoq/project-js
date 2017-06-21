// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const cUIdentifier = require('./cUIdentifier');
const operationDefinition = require('./operationDefinition');

module.exports = {
  encode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? cUIdentifier.encode(data.identifier)
      : null,
    definition: (data.definition !== null && typeof data.definition !== 'undefined')
      ? operationDefinition.encode(data.definition)
      : null,
  }),
  decode: data => ({
    identifier: (data.identifier !== null && typeof data.identifier !== 'undefined')
      ? cUIdentifier.decode(data.identifier)
      : undefined,
    definition: (data.definition !== null && typeof data.definition !== 'undefined')
      ? operationDefinition.decode(data.definition)
      : undefined,
  }),
};
