const connectedDataModel = require('./../models/connectedData');
const {
  getAllTimebasedDataModelRemoteIds,
  getTimebasedDataModel,
} = require('./../models/timebasedDataFactory');
const { getByQueryId: getRegisteredQueries } = require('./../models/registeredQueries');
const { get: getDcStatus } = require('./../models/dcStatus');
const { get: getLastPubSubTimestamp } = require('./../models/lastPubSubTimestamp');

/**
 * Return object that represents current server models state
 *
 * @return {{connectedData, timebasedData: *}}
 */
module.exports = () => {
  const connectedData = connectedDataModel.getAll();
  const tbdModels = getAllTimebasedDataModelRemoteIds();

  const timebasedData = tbdModels.reduce((list, model) => Object.assign(
    list,
    { [model]: getTimebasedDataModel(model).count() }
  ), {});

  const registeredQueries = getRegisteredQueries();

  const dcStatus = getDcStatus();

  const lastPubSubTimestamp = getLastPubSubTimestamp();

  return {
    connectedData,
    timebasedData,
    registeredQueries,
    dcStatus,
    lastPubSubTimestamp,
  };
};
