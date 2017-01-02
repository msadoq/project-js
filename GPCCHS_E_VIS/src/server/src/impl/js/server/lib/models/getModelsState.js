const connectedDataModel = require('./connectedData');
const subscriptionsModel = require('./subscriptions');
const {
  getAllTimebasedDataModelRemoteIds,
  getTimebasedDataModel,
} = require('./timebasedDataFactory');

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
