const debug = require('debug')('models:cacheBinary');
const database = require('../io/loki');

const collection = database.addCollection('cacheBinary');

collection.addRecord = (meta, data) => {
  collection.insert(Object.assign({}, meta, {
    binPayload: data,
  }));
  debug.debug('inserted', meta, data);
};

// TODO : unit test

module.exports = collection;
