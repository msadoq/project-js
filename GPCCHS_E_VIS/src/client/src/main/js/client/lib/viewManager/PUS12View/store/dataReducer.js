// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';

import { VM_VIEW_PUS12 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';


// eslint-disable-next-line no-unused-vars
function pus12DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
        action.payload: {
          timestamp: number,
          data: {
            ...headerDatas:
            pus012ParameterMonitoringDefinition:[
              {
                ...
                pus012MonitoringCheckPropertiesLow: {}
                pus012MonitoringCheckPropertiesHigh: {}
                pus012MonitoringCheckPropertiesExpected: {}
              },
            ],
          }
      */
      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS12], action);

      const checkTypes = parameters.get('PUS_CONSTANTS').CHECK_TYPE;
      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      if (!data) {
        return state;
      }
      let updatedState = state;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus012ParameterMonitoringDefinition'],
          data
        ),
        serviceStatus: statuses[String(_.getOr(200, 'serviceStatus', data))],
        lastUpdateModeServiceStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeServiceStatus', data))],
      };

      const isExpectedValue = elData => checkTypes[_.getOr('4', 'checkType', elData)] === 'EXPECTED VALUE';
      const isDeltaOrLimit = hData => ['DELTA', 'LIMIT'].includes(checkTypes[_.getOr('4', 'checkType', hData)]);

      const bindToBoolKey = (arr, store) => {
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

      const selectExpectedData = (store) => {
        const isExpected = isExpectedValue(store);
        return {
          ..._.omit(
            [
              'pus012MonitoringCheckPropertiesLow',
              'pus012MonitoringCheckPropertiesHigh',
              'pus012MonitoringCheckPropertiesExpected',
              'lastUpdateModeMonInterval',
              'isMonitoringIntervalSet',
              'lastUpdateModeRepetition',
              'isRepetitionNumberSet',
            ], store),

          ...bindToBoolKey(['isMonitoringIntervalSet', 'monitoringInterval', 'lastUpdateModeMonInterval'], store),
          ...bindToBoolKey(['isRepetitionNumberSet', 'repetitionNumber', 'lastUpdateModeRepetition'], store),

          checkType: checkTypes[_.getOr('4', 'checkType', store)],
          monitoringStatus: statuses[String(_.getOr(200, 'monitoringStatus', store))],
          lastUpdateModeMonId: updateTypes[String(_.getOr(200, 'lastUpdateModeMonId', store))],
          lastUpdateModeParamId: updateTypes[String(_.getOr(200, 'lastUpdateModeParamId', store))],
          lastUpdateModeCheckType: updateTypes[String(_.getOr(200, 'lastUpdateModeCheckType', store))],
          lastUpdateModeMonStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeMonStatus', store))],
          lastUpdateModeProtectionStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeProtectionStatus', store))],

          ...isExpected ? {
            lastUpdateModeValParamId: updateTypes[String(_.getOr(200, 'lastUpdateModeValParamId', store))],
            lastUpdateModeParamCurrentValue: updateTypes[String(_.getOr(200, 'lastUpdateModeParamCurrentValue', store))],
            lastUpdateModeValParamExpectValue: updateTypes[String(_.getOr(200, 'lastUpdateModeValParamExpectValue', store))],
            lastUpdateModeValParamMask: updateTypes[String(_.getOr(200, 'lastUpdateModeValParamMask', store))],
          } : {
            validityParameterId: '',
            validityParameterName: '',
            validityParameterMask: '',
            parameterCurrentValue: '',
            validityParameterExpectedValue: '',
          },
        };
      };

      const getELData = (store) => {
        const isExpected = isExpectedValue(store);
        const elData = _.mapKeys(
          value => value.concat('EL'),
          _.get(
            isExpected ? 'pus012MonitoringCheckPropertiesExpected' :
            'pus012MonitoringCheckPropertiesLow',
            store)
        );
        return {
          ...elData,
          ridStatusEL: statuses[String(_.getOr(200, 'ridStatusEL', elData))],
          actionStatusEL: statuses[String(_.getOr(200, 'actionStatusEL', elData))],
          lastUpdateModeRidEL: updateTypes[String(_.getOr(200, 'lastUpdateModeRidEL', elData))],
          lastUpdateModeActionStatusEL: updateTypes[String(_.getOr(200, 'lastUpdateModeActionStatusEL', elData))],
          lastUpdateModeRidStatusEL: updateTypes[String(_.getOr(200, 'lastUpdateModeRidStatusEL', elData))],
          lastUpdateModeMaskEL: updateTypes[String(_.getOr(200, 'lastUpdateModeMaskEL', elData))],
          lastUpdateModeValueEL: updateTypes[String(_.getOr(200, 'lastUpdateModeValueEL', elData))],
        };
      };

      const getHData = (store) => {
        const isShown = isDeltaOrLimit(store);
        const hData = _.mapKeys(
          value => value.concat('H'),
          _.get('pus012MonitoringCheckPropertiesHigh', store)
        );
        return isShown ? {
          ...hData,
          ridStatusH: statuses[String(_.getOr(200, 'ridStatusH', hData))],
          actionStatusH: statuses[String(_.getOr(200, 'actionStatusH', hData))],
          lastUpdateModeRidH: updateTypes[String(_.getOr(200, 'lastUpdateModeRidH', hData))],
          lastUpdateModeActionStatusH: updateTypes[String(_.getOr(200, 'lastUpdateModeActionStatusH', hData))],
          lastUpdateModeRidStatusH: updateTypes[String(_.getOr(200, 'lastUpdateModeRidStatusH', hData))],
          lastUpdateModeValueH: updateTypes[String(_.getOr(200, 'lastUpdateModeValueH', hData))],
          lastUpdateModeMaskH: updateTypes[String(_.getOr(200, 'lastUpdateModeMaskH', hData))],
        } : _.mapValues(() => '', hData);
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'parameterMonitoringDefinitions',
        _.getOr(null, ['pus012ParameterMonitoringDefinition'], data)
        .map(store => ({
          ...selectExpectedData(store),
          ...getELData(store),
          ...getHData(store),
        }))
      );
      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus12DataReducer, {}, VM_VIEW_PUS12);

export const getPUS12ViewData = state => state[`${VM_VIEW_PUS12}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS12}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS12}Configuration`][viewId];
