// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Cleanup main and server startup process
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// END-HISTORY
// ====================================================================

const { dc } = require('../../ipc');
/**
 * Send product log to DC
 *
 * @param pushToDc
 * @param payload
 */
module.exports = (pushToDc, { uid, args }) => {
  dc.sendProductLog(uid, args);
};
