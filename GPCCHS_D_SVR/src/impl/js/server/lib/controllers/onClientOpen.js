const debug = require('../io/debug')('controllers:onClientOpen');
const workspaceParser = require('../documents/workspace');

/**
 * Triggered when client main process websocket is open
 * @param spark
 */
module.exports = spark => {
  debug.info(spark.id, 'main process websocket opened');

  // TODO : get workspace from params, if not set, send empty open event

  workspaceParser('dev.workspace.json', (err, content) => {
    if (err) {
      throw err; // TODO error channel?
    }

    return spark.write({
      event: 'open',
      payload: content,
    });
  });
};
