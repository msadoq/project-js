const debug = require('../io/debug')('models:subscriptions');
const database = require('../io/loki');
const {
  remove: _remove,
  values: _values,
  assign: _assign,
  keys: _keys,
  omit: _omit,
} = require('lodash');
const flattenDataId = require('../utils/flattenDataId');

const collection = database.addCollection('subscriptions',
  {
    unique: 'flatDataId',
  }
);

collection.getFlatDataIdIndex = () => collection.constraints.unique.flatDataId;

collection.getAll = () => _remove(_values(collection.getFlatDataIdIndex().keyMap), undefined);

collection.addFilters = (dataId, filters) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (!subscription) {
    return undefined;
  }
  debug.debug('before update', subscription);
  subscription.filters = _assign({}, subscription.filters, filters);
  debug.debug('update', subscription);
  collection.update(subscription); // TODO This update operation could be not needed
  return subscription;
};

collection.getRemoteIds = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (!subscription) {
    return undefined;
  }
  return _keys(subscription.filters);
};

collection.getFilters = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (!subscription) {
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

  if (!subscription) {
    return;
  }

  collection.remove(subscription);
};

collection.exists = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  if (!collection.by('flatDataId', flatDataId)) {
    return false;
  }
  return true;
};

collection.removeRemoteId = (dataId, remoteId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (!subscription) {
    return undefined;
  }
  subscription.filters = _omit(subscription.filters, remoteId);
  collection.update(subscription); // TODO This update operation could be not needed
  return subscription;
};

collection.cleanup = () => {
  debug.debug('subscription cleared');
  collection.clear();
  collection.getFlatDataIdIndex().clear();
};

module.exports = collection;
