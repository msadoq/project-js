const debug = require('../lib/io/debug')('models:cacheBinary');
const database = require('../lib/io/loki');

const collection = database.addCollection('cacheBinary');

collection.getLocalId = require('./../lib/models/getLocalId');

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
