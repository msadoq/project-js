const logger = require('common/log')('models:subscriptions');

const _remove = require('lodash/remove');
const _values = require('lodash/values');

const flattenDataId = require('common/utils/flattenDataId');

const database = require('./loki');

const collection = database.addCollection('subscriptions',
  {
    unique: 'flatDataId',
  }
);

collection.getFlatDataIdIndex = () => collection.constraints.unique.flatDataId;

collection.getAll = () => _remove(_values(collection.getFlatDataIdIndex().keyMap), undefined);

collection.getByDataId = dataId => collection.by('flatDataId', flattenDataId(dataId));

// collection.addFilters = (dataId, filters, subscription) => {
//   let sub = subscription;
//   if (!sub) {
//     const flatDataId = flattenDataId(dataId);
//     sub = collection.by('flatDataId', flatDataId);
//     if (!sub) {
//       return undefined;
//     }
//   }
//   logger.silly('before update', sub);
//   sub.filters = _assign({}, sub.filters, filters);
//   logger.silly('update', sub);
//   return sub;
// };

// collection.getRemoteIds = (dataId, subscription) => {
//   let sub = subscription;
//   console.log('***sub', sub);
//   if (!sub) {
//     const flatDataId = flattenDataId(dataId);
//     sub = collection.by('flatDataId', flatDataId);
//     if (!sub) {
//       return undefined;
//     }
//   }
//   return _keys(sub.data);
// };

// collection.getFilters = (dataId, subscription) => {
//   let sub = subscription;
//   if (!sub) {
//     const flatDataId = flattenDataId(dataId);
//     sub = collection.by('flatDataId', flatDataId);
//     if (!sub) {
//       return undefined;
//     }
//   }
//   return sub.filters;
// };

collection.addRecord = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (typeof subscription !== 'undefined') {
    return subscription;
  }
  logger.silly('insert', dataId);
  return collection.insert({
    flatDataId,
    dataId,
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
  return !!collection.by('flatDataId', flatDataId);
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
  // delete sub.filters[remoteId];
  return sub;
};

collection.cleanup = () => {
  logger.debug('subscription cleared');
  collection.clear();
  collection.getFlatDataIdIndex().clear();
};

module.exports = collection;
