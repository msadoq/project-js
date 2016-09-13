const debug = require('../io/debug')('models:views');
const database = require('../io/loki');

const collection = database.addCollection('views');

collection.addRecord = (sparkId, instance) => {
  collection.insert({
    id: sparkId,
    instance,
  });
  debug.debug('inserted', sparkId);
};

collection.delRecord = sparkId => {
  collection.removeWhere({ id: sparkId });
  debug.debug('deleted', sparkId);
};

collection.findBySparkId = sparkId => collection.find({
  id: sparkId,
});

module.exports = collection;
