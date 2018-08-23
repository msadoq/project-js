
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


export const getModelEntryByDataType = (dataType) => {
  const deltaKeys = {
    [constants.Pus005OnBoardEvent]: constants.PUS005_ON_BOARD_EVENT,
    [constants.Pus005OnBoardEvent]: constants.PUS005_ON_BOARD_EVENT,
    [constants.Pus011CommandType]: constants.PUS011_COMMAND,
    [constants.Pus011SubScheduleType]: constants.PUS011_SUB_SCHEDULE,
    [constants.Pus011ApidType]: constants.PUS011_APID,
    [constants.Pus012ParameterMonitoringDefinitionType]:
      constants.PUS012_PARAMETER_MONITORING_DEFINITION,
    [constants.Pus013DownlinkLDTType]: constants.PUS013_LDT_PART,
    [constants.Pus013UplinkLDTType]: constants.PUS013_LDT_PART,
    [constants.Pus014ForwardedPacketType]: constants.PUS014_TM_PACKET,
    [constants.Pus015PacketStoreType]: constants.PUS015_PACKET_STORE,
    [constants.Pus018ObcpType]: constants.PUS018_OBCP,
    [constants.Pus019EventActionType]: constants.PUS019_EVENT_ACTION,
    [constants.Pus140ParameterType]: constants.PUS140_PARAMETER,
    [constants.Pus142FunctionalMonitoringType]: constants.PUS142_FUNCTIONAL_MONITORING,
    [constants.Pus144OnBoardFileType]: constants.PUS144_ON_BOARD_FILES,
    [constants.PusMmePacketType]: constants.PUSMME_PACKET,
  };

  return deltaKeys[dataType] || null;
};

export const getViewType = (pusService) => {
  const pusServices = {
    [constants.PUS_SERVICE_05]: VM_VIEW_PUS05,
    [constants.PUS_SERVICE_11]: VM_VIEW_PUS11,
    [constants.PUS_SERVICE_12]: VM_VIEW_PUS12,
    [constants.PUS_SERVICE_13]: VM_VIEW_PUS13,
    [constants.PUS_SERVICE_14]: VM_VIEW_PUS14,
    [constants.PUS_SERVICE_15]: VM_VIEW_PUS15,
    [constants.PUS_SERVICE_MME]: VM_VIEW_PUSMME,
    [constants.PUS_SERVICE_18]: VM_VIEW_PUS18,
    [constants.PUS_SERVICE_19]: VM_VIEW_PUS19,
    [constants.PUS_SERVICE_140]: VM_VIEW_PUS140,
    [constants.PUS_SERVICE_142]: VM_VIEW_PUS142,
    [constants.PUS_SERVICE_144]: VM_VIEW_PUS144,
  };
  return pusServices[pusService] || null;
};

export const getTableIdsByPusService = (pusService) => {
  const pusServices = {
    [constants.PUS_SERVICE_05]: [constants.PUS005_ON_BOARD_EVENT],
    [constants.PUS_SERVICE_11]: [
      constants.PUS011_APID,
      constants.PUS011_COMMAND,
      constants.PUS011_SUB_SCHEDULE,
    ],
    [constants.PUS_SERVICE_12]: [constants.PUS012_PARAMETER_MONITORING_DEFINITION],
    [constants.PUS_SERVICE_13]: [constants.PUS013_LDT_PART],
    [constants.PUS_SERVICE_14]: [constants.PUS014_TM_PACKET],
    [constants.PUS_SERVICE_15]: [constants.PUS015_PACKET_STORE],
    [constants.PUS_SERVICE_MME]: [constants.PUSMME_PACKET],
    [constants.PUS_SERVICE_18]: [constants.PUS018_OBCP],
    [constants.PUS_SERVICE_19]: [constants.PUS019_EVENT_ACTION],
    [constants.PUS_SERVICE_140]: [constants.PUS140_PARAMETER],
    [constants.PUS_SERVICE_142]: [constants.PUS142_FUNCTIONAL_MONITORING],
    [constants.PUS_SERVICE_144]: [constants.PUS144_ON_BOARD_FILES],
  };
  return pusServices[pusService] || null;
};

export const getViewServiceFromType = (type) => {
  const pusTypes = {
    [VM_VIEW_PUS05]: [constants.PUS_SERVICE_05],
    [VM_VIEW_PUS11]: [constants.PUS_SERVICE_11],
    [VM_VIEW_PUS12]: [constants.PUS_SERVICE_12],
    [VM_VIEW_PUS13]: [constants.PUS_SERVICE_13],
    [VM_VIEW_PUS14]: [constants.PUS_SERVICE_14],
    [VM_VIEW_PUS15]: [constants.PUS_SERVICE_15],
    [VM_VIEW_PUSMME]: [constants.PUS_SERVICE_MME],
    [VM_VIEW_PUS18]: [constants.PUS_SERVICE_18],
    [VM_VIEW_PUS19]: [constants.PUS_SERVICE_19],
    [VM_VIEW_PUS140]: [constants.PUS_SERVICE_140],
    [VM_VIEW_PUS142]: [constants.PUS_SERVICE_142],
    [VM_VIEW_PUS144]: [constants.PUS_SERVICE_144],
  };
  return pusTypes[type] || null;
};

/**
 * @param boolKey boolean condition to display key value
 * @param key displayed if boolKey, or empty
 * @param tooltip matching tooltip to be added
 * @returns { key [, tooltip]} new object with updated key and tooltip
 */
export const bindToBoolKey = ([boolKey, key, tooltip], store) => {
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;
  let newStore = _.pick([key, tooltip], store);
  if (_.get(boolKey, store)) {
    newStore = _.set(
      tooltip,
      updateTypes[String(_.getOr(200, tooltip, newStore))],
      newStore
    );
  } else {
    newStore = _.set(key, '', newStore);
  }
  return newStore;
};

export const tableOverrideStyle = statusKeyList =>
  ({ content }) => {
    const statusColors = parameters.get('PUS_CONSTANTS').STATUS_COLOR;
    const { value, colKey } = content;

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
