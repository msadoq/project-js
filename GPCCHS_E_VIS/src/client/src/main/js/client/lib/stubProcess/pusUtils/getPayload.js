const stubs = require('../../utils/stubs');
const constants = require('../../constants');

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
      return { dataType: 0, groundDate: timestamp, payload: stubData.getPus005ModelProtobuf() };
    }
    // case constants.Pus005ModelType: {
    //   return stubData.getPus005ModelProtobuf();
    // }
    // case constants.Pus005OnBoardEventType: {
    //   return stubData.getPus005OnBoardEventProtobuf();
    // }
    // case constants.Pus011CommandType: {
    //   return stubData.getPus011CommandProtobuf();
    // }
    // case constants.Pus011ModelType: {
    //   return stubData.getPus011ModelProtobuf({
    //     groundDate: timestamp,
    //   });
    // }
    // case constants.Pus011SubScheduleType: {
    //   return stubData.getPus011SubScheduleProtobuf();
    // }
    // case constants.Pus012ParameterMonitoringDefinitionType: {
    //   return stubData.getPus012ParameterMonitoringDefinitionProtobuf();
    // }
    // case constants.Pus013DownlinkLDTType: {
    //   return stubData.getPus013LdtProtobuf();
    // }
    // case constants.Pus013ModelType: {
    //   return stubData.getPus013ModelProtobuf();
    // }
    // case constants.Pus013UplinkLDTType: {
    //   return stubData.getPus013LdtProtobuf();
    // }
    // case constants.Pus014ForwardPacketType: {
    //   return stubData.getPus014ForwardedPacketProtobuf();
    // }
    // case constants.Pus014ModelType: {
    //   return stubData.getPus014ModelProtobuf();
    // }
    // case constants.Pus015ModelType: {
    //   return stubData.getPus015ModelProtobuf();
    // }
    // case constants.Pus015PacketType: {
    //   return stubData.getPus015PacketProtobuf();
    // }
    // case constants.Pus018ModelType: {
    //   return stubData.getPus018ModelProtobuf();
    // }
    // case constants.Pus018ObcpType: {
    //   return stubData.getPus018ObcpProtobuf();
    // }
    // case constants.Pus019EventActionType: {
    //   return stubData.getPus019EventActionProtobuf();
    // }
    // case constants.Pus019ModelType: {
    //   return stubData.getPus019ModelProtobuf();
    // }
    // case constants.Pus140ParameterType: {
    //   return stubData.getPus140ParameterProtobuf();
    // }
    // case constants.Pus142FunctionalMonitoringType: {
    //   return stubData.getPus142FunctionalMonitoringProtobuf();
    // }
    // case constants.Pus142ModelType: {
    //   return stubData.getPus011ModelProtobuf();
    // }
    // case constants.Pus144ModelType: {
    //   return stubData.getPus144ModelProtobuf();
    // }
    // case constants.Pus144OnBoardFileType: {
    //   return stubData.getPus144OnboardFileProtobuf();
    // }
    default: {
      return null;
    }
  }
}

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
