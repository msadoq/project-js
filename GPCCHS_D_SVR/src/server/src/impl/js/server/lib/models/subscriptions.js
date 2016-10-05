const debug = require('../io/debug')('models:subscriptions');
const database = require('../io/loki');
const _ = require('lodash');
const flattenDataId = require('./getLocalId');

const collection = database.addCollection('subscriptions',
  {
    unique: 'flatDataId',
  }
);

collection.getFlatDataIdIndex = () => collection.constraints.unique.flatDataId;

collection.getAll = () => _.remove(_.values(collection.getFlatDataIdIndex().keyMap), undefined);

collection.addFilters = (dataId, filters) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (typeof subscription === 'undefined') {
    return undefined;
  }
  debug.debug('before update', subscription);
  subscription.filters = _.assign({}, subscription.filters, filters);
  debug.debug('update', subscription);
  collection.update(subscription); // TODO This update operation could be not needed
  return subscription;
};

collection.getRemoteIds = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (typeof subscription === 'undefined') {
    return undefined;
  }
  return _.keys(subscription.filters);
};

collection.getFilters = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (typeof subscription === 'undefined') {
    return undefined;
  }
  return subscription.filters;
};

collection.addRecord = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (typeof subscription !== 'undefined') {
    return subscription;
  }
  debug.debug('insert', dataId);
  return collection.insert({
    flatDataId,
    dataId,
    filters: {},
  });
};

collection.removeByDataId = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);

  if (typeof subscription === 'undefined') {
    return;
  }

  collection.remove(subscription);
};

collection.retrieveByWindow = windowId => collection.find({
  windows: {
    $contains: windowId,
  },
});

collection.exists = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  if (typeof collection.by('flatDataId', flatDataId) === 'undefined') {
    return false;
  }
  return true;
};


collection.cleanup = () => {
  debug.debug('subscription cleared');
  collection.clear();
  collection.getFlatDataIdIndex().clear();
};

module.exports = collection;
