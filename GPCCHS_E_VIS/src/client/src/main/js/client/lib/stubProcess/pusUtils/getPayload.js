const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

const getDataByPusService = (pusService, timestamp) => {
  switch (pusService) {
    case 5: {
      return { dataType: 1, groundDate: timestamp, payload: stubData.getPus005ModelProtobuf() };
    }
    case 11: {
      return { dataType: 4, groundDate: timestamp, payload: stubData.getPus011ModelProtobuf() };
    }
    case 12: {
      return { dataType: 6, groundDate: timestamp, payload: stubData.getPus012ModelProtobuf() };
    }
    case 14: {
      return { dataType: 12, groundDate: timestamp, payload: stubData.getPus014ModelProtobuf() };
    }
    case 15: {
      return { dataType: 13, groundDate: timestamp, payload: stubData.getPus015ModelProtobuf() };
    }
    case 0: {
      return { dataType: 25, groundDate: timestamp, payload: stubData.getPusMmeModelProtobuf() };
    }
    default: {
      return null;
    }
  }
};

/**
 * Generate payload for stubs
 * @param  {number} timestamp Timestamp for the generated payload
 * @param  {object} dataId
 * @param  {Object} options   Options for generation
 * @return {Object}           Generated payload
 */
module.exports = function getPayload(pusService, timestamp) {
  return stubData.getDataStructureProtobuf(getDataByPusService(pusService, timestamp));
};
