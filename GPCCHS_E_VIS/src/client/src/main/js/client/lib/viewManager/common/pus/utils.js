
import _ from 'lodash/fp';
import {
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
} from 'viewManager/constants';
import { addTooltipWithContent } from './tooltip';
import parameters from '../../../common/configurationManager';
import constants from '../../../constants';

export const tableOverrideStyle = statusKeyList =>
  ({ content }) => {
    const statusColors = parameters.get('PUS_CONSTANTS').STATUS_COLOR;
    const { value, colKey } = content;
    // console.log(JSON.stringify(statusColors, null, 2));

    // empty field style within StatusKeyList should not be overrided
    if (typeof value === 'string' && value.length === 0) {
      return {};
    }
    if (statusKeyList.indexOf(colKey) > -1) {
      return { backgroundColor: statusColors[value] };
    }
    return {};
  };

export const tableModifier = tooltips =>
  (cellContent = {}, content = {}) => {
    const { colKey, value } = cellContent;
    if (typeof value === 'string' && value.length === 0) {
      return cellContent;
    }
    const toolT = tooltips[colKey];
    if (toolT === undefined) {
      return cellContent;
    }
    return addTooltipWithContent(
      cellContent,
      content,
      {
        lastUpdateMode: { key: toolT.mode },
        lastUpdateTime: { key: toolT.time },
      }
    );
  };

export const getModelEntryByDataType = (dataType) => {
  switch (dataType) {
    case constants.Pus005OnBoardEvent: {
      return constants.PUS005_ON_BOARD_EVENT;
    }
    case constants.Pus011CommandType: {
      return constants.PUS011_COMMAND;
    }
    case constants.Pus011SubScheduleType: {
      return constants.PUS011_SUB_SCHEDULE;
    }
    case constants.Pus011ApidType: {
      return constants.PUS011_APID;
    }
    case constants.Pus012ParameterMonitoringDefinitionType: {
      return constants.PUS012_PARAMETER_MONITORING_DEFINITION;
    }
    case constants.Pus013DownlinkLDTType:
    case constants.Pus013UplinkLDTType: {
      return constants.PUS013_LDT_PART;
    }
    case constants.Pus014ForwardPacketType: {
      return constants.PUS014_TM_PACKET;
    }
    case constants.Pus015PacketType: {
      return constants.PUS015_PACKET_STORE;
    }
    case constants.Pus018ObcpType: {
      return constants.PUS018_OBCP;
    }
    case constants.Pus019EventActionType: {
      return constants.PUS019_EVENT_ACTION;
    }
    case constants.Pus140ParameterType: {
      return constants.PUS140_PARAMETER;
    }
    case constants.Pus142FunctionalMonitoringType: {
      return constants.PUS142_FUNCTIONAL_MONITORING;
    }
    case constants.Pus144OnBoardFileType: {
      return constants.PUS144_ON_BOARD_FILES;
    }
    case constants.PusMmePacketType: {
      return constants.PUSMME_PACKET;
    }
    default: {
      return null;
    }
  }
};

export const getViewType = (pusService) => {
  switch (pusService) {
    case constants.PUS_SERVICE_05: {
      return VM_VIEW_PUS05;
    }
    case constants.PUS_SERVICE_11: {
      return VM_VIEW_PUS11;
    }
    case constants.PUS_SERVICE_12: {
      return VM_VIEW_PUS12;
    }
    case constants.PUS_SERVICE_13: {
      return VM_VIEW_PUS13;
    }
    case constants.PUS_SERVICE_14: {
      return VM_VIEW_PUS14;
    }
    case constants.PUS_SERVICE_15: {
      return VM_VIEW_PUS15;
    }
    case constants.PUS_SERVICE_MME: {
      return VM_VIEW_PUSMME;
    }
    case constants.PUS_SERVICE_18: {
      return VM_VIEW_PUS18;
    }
    case constants.PUS_SERVICE_19: {
      return VM_VIEW_PUS19;
    }
    case constants.PUS_SERVICE_140: {
      return VM_VIEW_PUS140;
    }
    case constants.PUS_SERVICE_142: {
      return VM_VIEW_PUS142;
    }
    case constants.PUS_SERVICE_144: {
      return VM_VIEW_PUS144;
    }
    default: {
      return null;
    }
  }
};

export const getTableIdsByPusService = (pusService) => {
  switch (pusService) {
    case constants.PUS_SERVICE_05: {
      return [constants.PUS005_ON_BOARD_EVENT];
    }
    case constants.PUS_SERVICE_11: {
      return [constants.PUS011_APID, constants.PUS011_COMMAND, constants.PUS011_SUB_SCHEDULE];
    }
    case constants.PUS_SERVICE_12: {
      return [constants.PUS012_PARAMETER_MONITORING_DEFINITION];
    }
    case constants.PUS_SERVICE_13: {
      return [constants.PUS013_LDT_PART];
    }
    case constants.PUS_SERVICE_14: {
      return [constants.PUS014_TM_PACKET];
    }
    case constants.PUS_SERVICE_15: {
      return [constants.PUS015_PACKET_STORE];
    }
    case constants.PUS_SERVICE_MME: {
      return [constants.PUSMME_PACKET];
    }
    case constants.PUS_SERVICE_18: {
      return [constants.PUS018_OBCP];
    }
    case constants.PUS_SERVICE_19: {
      return [constants.PUS019_EVENT_ACTION];
    }
    case constants.PUS_SERVICE_140: {
      return [constants.PUS140_PARAMETER];
    }
    case constants.PUS_SERVICE_142: {
      return [constants.PUS142_FUNCTIONAL_MONITORING];
    }
    case constants.PUS_SERVICE_144: {
      return [constants.PUS144_ON_BOARD_FILES];
    }
    default: {
      return null;
    }
  }
};

export const bindToBoolKey = (arr, store) => {
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;
  const [boolKey, key, toolType] = arr;
  let newStore = _.pick([key, toolType], store);
  if (_.get(boolKey, store)) {
    newStore = _.set(
      toolType,
      updateTypes[String(_.getOr(200, toolType, newStore))],
      newStore
    );
  } else {
    newStore = _.set(key, '', newStore);
  }
  return newStore;
};
