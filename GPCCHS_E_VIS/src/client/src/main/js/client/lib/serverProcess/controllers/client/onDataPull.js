const _each = require('lodash/each');
const logger = require('../../../common/logManager')('controllers:client:onDataPull');
const executionMonitor = require('../../../common/logManager/execution');
const { getTimebasedDataModel } = require('../../models/timebasedDataFactory');
const { add: addToQueue } = require('../../models/dataQueue');

/**
 * Triggered when the data consumer pull timebased data
 *
 * - loop over flatDataIds
 *    - loop over 'last' intervals
 *        - queue only the nearest data from the upper of the interval
 *    - loop over 'range' intervals
 *        - retrieve data in timebasedData model
 *        - queue a ws newData message (sent periodically)
 *
 * @param queries
 */

module.exports = ({ queries }) => {
  const execution = executionMonitor('pull');
  execution.reset();
  execution.start('global');
  // loop over flatDataIds
  _each(queries, (query, flatDataId) => {
    // loop over range intervals
    execution.start('finding cache model');
    const timebasedDataModel = getTimebasedDataModel(flatDataId);
    execution.stop('finding cache model');
    if (!timebasedDataModel) {
      logger.silly('no cached data found for', flatDataId);
      return;
    }

    execution.start('finding cache data');
    // range
    _each(query.range, (interval) => {
      // retrieve data in timebasedData model
      const cachedData = timebasedDataModel.findByInterval(
        interval[0],
        interval[1]
      );
      // queue a ws newData message (sent periodically)
      if (cachedData.length === 0) {
        return;
      }
      execution.start('queue cache for sending');
      _each(cachedData, (datum) => {
        addToQueue(flatDataId, datum.timestamp, datum.payload);
      });
      execution.stop('queue cache for sending');
    });
    // last
    _each(query.last, (interval) => {
      // retrieve data in timebasedData model
      const cachedData = timebasedDataModel.findByInterval(
        interval[0],
        interval[1]
      );
      // queue a ws newData message (sent periodically)
      if (cachedData.length === 0) {
        return;
      }
      execution.start('queue cache for sending');
      const dataToSend = { timestamp: 0, payload: { } };
      _each(cachedData, (datum) => {
        if (datum.timestamp - dataToSend.timestamp > 0) {
          dataToSend.timestamp = datum.timestamp;
          dataToSend.payload = datum.payload;
        }
      });
      addToQueue(flatDataId, dataToSend.timestamp, dataToSend.payload);
      execution.stop('queue cache for sending');
    });
    execution.stop('finding cache data');
  });
  execution.stop('global');
  execution.print();
};
