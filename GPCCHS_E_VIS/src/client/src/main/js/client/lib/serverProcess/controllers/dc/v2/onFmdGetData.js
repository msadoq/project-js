// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:onFmdGetDataADE');
const globalConstants = require('../../../../constants');
const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on retrieve FMD document path response
 *
 * - decode and pass to registered callback
 *
 * @param reply function
 * @param args array
 */
module.exports = (buffers, requestId) => {
  logger.silly('called');

  const callback = pop(requestId);

  const blob = buffers[2];

  try {
    const { type, serializedOid } = decode('dc.dataControllerUtils.FMDFileInfo', buffers[1]);
    let detail;
    switch (type) {
      case globalConstants.FMDFILETYPE_COLLECTION: {
        detail = decode('isis.file.Collection', blob);
        break;
      }
      case globalConstants.FMDFILETYPE_COLLECTION_DOCUMENT: {
        detail = decode('isis.file.CollectionDocument', blob);
        break;
      }
      case globalConstants.FMDFILETYPE_DOCUMENT: {
        detail = decode('isis.file.Document', blob);
        break;
      }
      case globalConstants.FMDFILETYPE_FOLDER: {
        detail = decode('isis.file.Folder', blob);
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
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback({ err: e });
  }
};
