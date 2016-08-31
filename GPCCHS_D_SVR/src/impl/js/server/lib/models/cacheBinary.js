const debug = require('../io/debug')('models:cacheBinary');
const database = require('../io/loki');

const collection = database.addCollection('cacheBinary');

collection.getLocalId = require('./getLocalId');

collection.addRecord = (dataId, timestamp, payload) => {
  const localId = collection.getLocalId(dataId);
  collection.insert({
    localId,
    timestamp,
    payload,
  });
  debug.debug('inserted', localId);
};

module.exports = collection;
