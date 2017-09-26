// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Add types.proto in dc - Add parse/stringify mechanism to configurationManager
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Fix "Maximum call stack exceeded" due to ES6 transpilation of rest operator in function arguments that use .apply() in ES5
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Refacto onFmdCreateData and onFmdGetData dc controllers
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onFmdGetData');
const globalConstants = require('../../../constants');
const { pop } = require('../../../common/callbacks');

/**
 * Triggered on retrieve FMD document path response
 *
 * - decode and pass to registered callback
 *
 * @param reply function
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');

  const queryIdBuffer = args[0];
  const statusBuffer = args[1];
  const buffer = args[2];
  const secondBuffer = args[3];

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);

  const callback = pop(queryId);

  const { status } = decode('dc.dataControllerUtils.Status', statusBuffer);
  if (status !== globalConstants.STATUS_SUCCESS) {
    const { string: reason } = decode('dc.dataControllerUtils.String', buffer);
    callback({ err: reason });
  } else {
    const { type, serializedOid } = decode('dc.dataControllerUtils.FMDFileInfo', buffer);
    let detail;
    switch (type) {
      case globalConstants.FMDFILETYPE_COLLECTION: {
        detail = decode('isis.file.Collection', secondBuffer);
        break;
      }
      case globalConstants.FMDFILETYPE_COLLECTION_DOCUMENT: {
        detail = decode('isis.file.CollectionDocument', secondBuffer);
        break;
      }
      case globalConstants.FMDFILETYPE_DOCUMENT: {
        detail = decode('isis.file.Document', secondBuffer);
        break;
      }
      case globalConstants.FMDFILETYPE_FOLDER: {
        detail = decode('isis.file.Folder', secondBuffer);
        break;
      }
      default:
        callback({ err: `received unknown file type '${type}'` });
        return;
    }

    callback({
      type,
      oId: serializedOid,
      detail,
    });
  }
};
