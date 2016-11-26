const { Router } = require('express');

const router = new Router();

const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const {
  getAllTimebasedDataModelRemoteIds,
  getTimebasedDataModel,
} = require('../../models/timebasedDataFactory');

router.get('/',
  (req, res) => {
    const connectedData = connectedDataModel.getAll();
    const subscriptions = subscriptionsModel.getAll();
    const tbdModels = getAllTimebasedDataModelRemoteIds();

    const timebasedData = tbdModels.reduce((list, model) => Object.assign(
      list,
      { [model]: getTimebasedDataModel(model).count() }
    ), {});

    res.send({
      connectedData,
      subscriptions,
      timebasedData,
    });
  });

module.exports = router;
