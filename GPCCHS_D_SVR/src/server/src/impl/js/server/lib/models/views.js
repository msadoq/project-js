const debug = require('../io/debug')('models:views');
const database = require('../io/loki');

const collection = database.addCollection('views');

collection.addRecord = (sparkId, instance) => {
  debug.debug('insert', sparkId);
  return collection.insert({
    id: sparkId,
    visible: true,
    instance,
  });
};

collection.delRecord = (sparkId) => {
  collection.removeWhere({ id: sparkId });
  debug.debug('deleted', sparkId);
};

collection.findBySparkId = sparkId => collection.find({
  id: sparkId,
});

collection.retrieveVisible = () => collection.find({
  visible: true,
});

collection.cleanup = () => collection.chain().find().remove();

module.exports = collection;
