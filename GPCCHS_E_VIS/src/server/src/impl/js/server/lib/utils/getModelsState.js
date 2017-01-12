const connectedDataModel = require('./../models/connectedData');
const subscriptionsModel = require('./../models/subscriptions');
const {
  getAllTimebasedDataModelRemoteIds,
  getTimebasedDataModel,
} = require('./../models/timebasedDataFactory');

/**
 * Return object that represents current server models state
 *
 * @return {{connectedData, subscriptions, timebasedData: *}}
 */
module.exports = () => {
  const connectedData = connectedDataModel.getAll();
  const subscriptions = subscriptionsModel.getAll();
  const tbdModels = getAllTimebasedDataModelRemoteIds();

  const timebasedData = tbdModels.reduce((list, model) => Object.assign(
    list,
    { [model]: getTimebasedDataModel(model).count() }
  ), {});

  return {
    connectedData,
    subscriptions,
    timebasedData,
  };
};
