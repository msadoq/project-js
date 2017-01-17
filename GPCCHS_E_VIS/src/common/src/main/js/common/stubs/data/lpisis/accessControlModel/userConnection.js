// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  userName: 'mySTRING',
  serverName: 'mySTRING',
  terminalId: 'mySTRING',
  genericAccount: 'mySTRING',
  loginTime: now,
  authID: Buffer.alloc(10, 1),
}, override);

