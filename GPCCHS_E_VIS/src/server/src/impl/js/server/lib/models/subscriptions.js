const debug = require('../io/debug')('models:subscriptions');

// eslint-disable-next-line no-underscore-dangle
const _remove = require('lodash/remove');
// eslint-disable-next-line no-underscore-dangle
const _values = require('lodash/values');
// eslint-disable-next-line no-underscore-dangle
const _assign = require('lodash/assign');
// eslint-disable-next-line no-underscore-dangle
const _keys = require('lodash/keys');

const flattenDataId = require('../utils/flattenDataId');

const database = require('../io/loki');

const collection = database.addCollection('subscriptions',
  {
    unique: 'flatDataId',
  }
);

collection.getFlatDataIdIndex = () => collection.constraints.unique.flatDataId;

collection.getAll = () => _remove(_values(collection.getFlatDataIdIndex().keyMap), undefined);

collection.getByDataId = dataId => collection.by('flatDataId', flattenDataId(dataId));

collection.addFilters = (dataId, filters, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  debug.debug('before update', sub);
  sub.filters = _assign({}, sub.filters, filters);
  debug.debug('update', sub);
  return sub;
};

collection.getRemoteIds = (dataId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  return _keys(sub.filters);
};

collection.getFilters = (dataId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  return sub.filters;
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

collection.removeByDataId = (dataId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return;
    }
  }

  collection.remove(sub);
};

collection.exists = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  if (!collection.by('flatDataId', flatDataId)) {
    return false;
  }
  return true;
};

collection.removeRemoteId = (dataId, remoteId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  delete sub.filters[remoteId];
  return sub;
};

collection.cleanup = () => {
  debug.debug('subscription cleared');
  collection.clear();
  collection.getFlatDataIdIndex().clear();
};

module.exports = collection;
