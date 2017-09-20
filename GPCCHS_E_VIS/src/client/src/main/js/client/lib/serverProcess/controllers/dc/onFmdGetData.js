const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onFmdGetData');
const globalConstants = require('../../../constants');
const { pop } = require('../../../common/callbacks');
const { add: addMessage } = require('../../../store/actions/messages');
const { getStore } = require('../../store');

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

  try {
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
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback({ err: e });
  }
};
