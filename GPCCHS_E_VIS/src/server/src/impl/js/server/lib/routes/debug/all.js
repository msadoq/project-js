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
    const remoteIds = tbdModels.map(m => ({
      [m]: getTimebasedDataModel(m),
    }));

    res.send({
      connectedData,
      subscriptions,
      remoteIds,
    });
  });

module.exports = router;
