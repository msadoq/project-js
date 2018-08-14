const _forEach = require('lodash/forEach');
const { getPusFlattenId } = require('common/flattenDataId');
const logger = require('../../../common/logManager')('controllers:PUS:onInitialize');
const { decode } = require('../../../utils/adapters');
const { add: addMessage } = require('../../../store/actions/messages');
const { savePusData } = require('store/actions/pus');
const constants = require('../../../constants');
const { getViewType } = require('../../../viewManager/common/pus/utils');

const { MODELS } = require('viewManager/constants');

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
    case constants.Pus011ApidType: {
      return decode('isis.pusModelEditorMessages.Pus011Apid', payload);
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
    case constants.Pus015PacketStoreType: {
      return decode('isis.pusModelEditorMessages.Pus015PacketStore', payload);
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

const isModel = dataType => MODELS.indexOf(dataType) !== -1;

const cleanupPayload = (payload) => {
  const newPayload = {};
  const keys = Object.keys(payload);
  _forEach(keys, (key) => {
    // the key is a reference to an array
    if (Array.isArray(payload[key])) {
      newPayload[key] = [];
      _forEach(payload[key], data => newPayload[key].push(cleanupPayload(data)));
    } else if (typeof payload[key] === 'object') {
      if (payload[key].symbol || (payload[key].value !== undefined && typeof payload[key].value !== 'object')) {
        newPayload[key] = payload[key].symbol || payload[key].value;
      } else {
        newPayload[key] = cleanupPayload(payload[key]);
      }
    }
  });
  return newPayload;
};

const onPusData = (messageData, pusService, apids, domainId, sessionId, getStore) => {
  logger.silly('called');
  const store = getStore();
  try {
    const { dataType, groundDate, payload } = decode('isis.pusModelEditorMessages.DataStructure', messageData);
    const decodedPayload = getDecodedPayload(dataType.value, payload.value);
    const cleanPayload = cleanupPayload(decodedPayload);
    const viewType = getViewType(pusService);
    logger.debug('SAVE PUS DATA IN STORE', viewType);
    const flattenId = getPusFlattenId(apids, { domainId, sessionId });
    store.dispatch(savePusData(
      pusService,
      flattenId,
      groundDate.value,
      cleanPayload,
      isModel(dataType.value),
      dataType.value
    ));
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
