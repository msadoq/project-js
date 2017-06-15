const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers:onFmdGetData');
const globalConstants = require('../../../constants');

/**
 * Triggered on retrieve FMD document path response
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param statusBuffer
 * @param buffer
 * @param secondBuffer
 */
module.exports = (reply, queryIdBuffer, statusBuffer, buffer, secondBuffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);

  const { status } = decode('dc.dataControllerUtils.Status', statusBuffer);
  if (status !== globalConstants.STATUS_SUCCESS) {
    const { string: reason } = decode('dc.dataControllerUtils.String', buffer);
    reply(queryId, { err: reason });
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
        reply(queryId, { err: `received unknown file type '${type}'` });
        return;
    }

    reply(queryId, {
      type,
      oId: serializedOid,
      detail,
    });
  }
};
