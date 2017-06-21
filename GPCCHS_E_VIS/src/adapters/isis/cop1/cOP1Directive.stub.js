// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');


const cOP1Directive = {
  attribute: _random(1, 100, true),
  id: 1,
};

module.exports = override => (override ? _defaultsDeep({}, override, cOP1Directive) : cOP1Directive);
