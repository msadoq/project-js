const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');
const _forEach = require('lodash/forEach');
const { decode } = require('../../../utils/adapters');
const { add: addMessage } = require('../../../store/actions/messages');
const { injectPusData } = require('store/actions/pus');
const constants = require('../../../constants');

const {
  VM_VIEW_PUS05,
  VM_VIEW_PUS11,
  VM_VIEW_PUS12,
  VM_VIEW_PUS13,
  VM_VIEW_PUS14,
  VM_VIEW_PUS15,
  VM_VIEW_PUS18,
  VM_VIEW_PUS19,
  VM_VIEW_PUS140,
  VM_VIEW_PUS142,
  VM_VIEW_PUS144,
  VM_VIEW_PUSMME,
} = require('viewManager/constants');

/* eslint-disable complexity */
const getDecodedPayload = (dataType, payload) => {
  switch (dataType) {
    case constants.Pus005ModelType: {
      return decode('isis.pusModelEditorMessages.Pus005Model', payload);
    }
    case constants.Pus005OnBoardEventType: {
      return decode('isis.pusModelEditorMessages.Pus005OnBoardEvent', payload);
    }
    case constants.Pus011CommandType: {
      return decode('isis.pusModelEditorMessages.Pus011Command', payload);
    }
    case constants.Pus011ModelType: {
      return decode('isis.pusModelEditorMessages.Pus011Model', payload);
    }
    case constants.Pus011SubScheduleType: {
      return decode('isis.pusModelEditorMessages.Pus011SubSchedule', payload);
    }
    case constants.Pus012ModelType: {
      return decode('isis.pusModelEditorMessages.Pus012Model', payload);
    }
    case constants.Pus012ParameterMonitoringDefinitionType: {
      return decode('isis.pusModelEditorMessages.Pus012ParameterMonitoringDefinition', payload);
    }
    case constants.Pus013DownlinkLDTType: {
      return decode('isis.pusModelEditorMessages.Pus013DownlinkLDT', payload);
    }
    case constants.Pus013ModelType: {
      return decode('isis.pusModelEditorMessages.Pus013Model', payload);
    }
    case constants.Pus013UplinkLDTType: {
      return decode('isis.pusModelEditorMessages.Pus013UplinkLDT', payload);
    }
    case constants.Pus014ForwardPacketType: {
      return decode('isis.pusModelEditorMessages.Pus014ForwardPacket', payload);
    }
    case constants.Pus014ModelType: {
      return decode('isis.pusModelEditorMessages.Pus014Model', payload);
    }
    case constants.Pus015ModelType: {
      return decode('isis.pusModelEditorMessages.Pus015Model', payload);
    }
    case constants.Pus015PacketType: {
      return decode('isis.pusModelEditorMessages.Pus015Packet', payload);
    }
    case constants.Pus018ModelType: {
      return decode('isis.pusModelEditorMessages.Pus018Model', payload);
    }
    case constants.Pus018ObcpType: {
      return decode('isis.pusModelEditorMessages.Pus018Obcp', payload);
    }
    case constants.Pus019EventActionType: {
      return decode('isis.pusModelEditorMessages.Pus019EventAction', payload);
    }
    case constants.Pus019ModelType: {
      return decode('isis.pusModelEditorMessages.Pus019Model', payload);
    }
    case constants.Pus140ModelType: {
      return decode('isis.pusModelEditorMessages.Pus140Model', payload);
    }
    case constants.Pus140ParameterType: {
      return decode('isis.pusModelEditorMessages.Pus140Parameter', payload);
    }
    case constants.Pus142FunctionalMonitoringType: {
      return decode('isis.pusModelEditorMessages.Pus142FunctionalMonitoring', payload);
    }
    case constants.Pus142ModelType: {
      return decode('isis.pusModelEditorMessages.Pus142Model', payload);
    }
    case constants.Pus144ModelType: {
      return decode('isis.pusModelEditorMessages.Pus144Model', payload);
    }
    case constants.Pus144OnBoardFileType: {
      return decode('isis.pusModelEditorMessages.Pus144OnBoardFile', payload);
    }
    case constants.PusMmeModelType: {
      return decode('isis.pusModelEditorMessages.PusMmeModel', payload);
    }
    case constants.PusMmePacketType: {
      return decode('isis.pusModelEditorMessages.PusMmePacket', payload);
    }
    default: {
      return null;
    }
  }
};

const getViewType = (pusService) => {
  switch (pusService) {
    case 5: {
      return VM_VIEW_PUS05;
    }
    case 11: {
      return VM_VIEW_PUS11;
    }
    case 12: {
      return VM_VIEW_PUS12;
    }
    case 13: {
      return VM_VIEW_PUS13;
    }
    case 14: {
      return VM_VIEW_PUS14;
    }
    case 15: {
      return VM_VIEW_PUS15;
    }
    case 18: {
      return VM_VIEW_PUS18;
    }
    case 19: {
      return VM_VIEW_PUS19;
    }
    case 140: {
      return VM_VIEW_PUS140;
    }
    case 142: {
      return VM_VIEW_PUS142;
    }
    case 144: {
      return VM_VIEW_PUS144;
    }
    case 0: {
      return VM_VIEW_PUSMME;
    }
    default: {
      return null;
    }
  }
};

const cleanupPayload = (payload) => {
  const newPayload = {};
  const keys = Object.keys(payload);
  _forEach(keys, (key) => {
    // the key is a reference to an array
    if (Array.isArray(payload[key])) {
      newPayload[key] = [];
      _forEach(payload[key], data => newPayload[key].push(cleanupPayload(data)));
    } else if (typeof payload[key] === 'object') {
      if (payload[key].value && typeof payload[key].value !== 'object') {
        newPayload[key] = payload[key].value;
      } else {
        newPayload[key] = cleanupPayload(payload[key]);
      }
    }
  });
  return newPayload;
};

const onPusData = (messageData, pusService, getStore) => {
  logger.silly('called');
  const store = getStore();
  try {
    const { dataType, payload } = decode('isis.pusModelEditorMessages.DataStructure', messageData);
    const decodedPayload = getDecodedPayload(dataType.value, payload.value);
    const cleanPayload = cleanupPayload(decodedPayload);
    const viewType = getViewType(pusService);
    store.dispatch(injectPusData({
      [viewType]: cleanPayload,
    }));
    logger.info('PUS DATA  INJECT', viewType);
    return;
  } catch (e) {
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    logger.error('error on processing header buffer '.concat(e));
  }
};

/**
 * Triggered on pus request response.
 *
 * - decode and pass to registered callback
 *
 * @param buffers
 * @param getStore
 */
module.exports = {
  onPusData,
  cleanupPayload,
};
