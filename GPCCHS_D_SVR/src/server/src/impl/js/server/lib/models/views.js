const debug = require('../io/debug')('models:views');
const database = require('../io/loki');
const _ = require('lodash');

const collection = database.addCollection('views', { unique: 'viewId' });

collection.getViewIdIndex = () => collection.constraints.unique.viewId;

collection.getAll = () => _.remove(_.values(collection.getViewIdIndex().keyMap), undefined);

collection.addRecord = (viewId, instance) => {
  debug.debug('insert', viewId);
  return collection.insert({
    viewId,
    instance,
  });
};

collection.delRecord = (viewId) => {
  const view = collection.by('viewId', viewId);
  if (typeof view === 'undefined') {
    return;
  }
  collection.remove(view);
  debug.debug('deleted', viewId);
};

collection.findByViewId = viewId => collection.by('viewId', viewId);

collection.cleanup = () => {
  debug.debug('views cleared');
  collection.clear();
  collection.getViewIdIndex().clear();
};

module.exports = collection;
