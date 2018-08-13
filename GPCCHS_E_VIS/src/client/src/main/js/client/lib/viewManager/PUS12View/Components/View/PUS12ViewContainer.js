import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { PUS_SERVICE_12 } from 'constants';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import PUS12View from './PUS12View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';
import parameters from '../../../../common/configurationManager';
import { bindToBoolKey } from '../../../common/pus/utils';

const pusService = PUS_SERVICE_12;
const statuses = parameters.get('PUS_CONSTANTS').STATUS;
const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;
const checkTypes = parameters.get('PUS_CONSTANTS').CHECK_TYPE;


const mapStateToProps = (state, { viewId }) => {
  let data = getPUSViewData(state, { viewId, pusService });
  const config = getConfigurationByViewId(state, { viewId });

  const isExpectedValue = elData => checkTypes[_.getOr('4', 'checkType', elData)] === 'EXPECTED VALUE';
  const isDeltaOrLimit = hData => ['DELTA', 'LIMIT'].includes(checkTypes[_.getOr('4', 'checkType', hData)]);

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    for (let i = 0; i < data.headers.length; i += 1) {
      data.headers[i].serviceStatus = statuses[String(_.getOr(200, 'serviceStatus', data.headers[i]))];
      data.headers[i].lastUpdateModeServiceStatus = updateTypes[String(_.getOr(200, 'lastUpdateModeServiceStatus', data.headers[i]))];
    }

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
          lastUpdateModeValParamExpectValue: updateTypes[String(_.getOr(200, 'lastUpdateModeValParamExpectValue', store))],
          lastUpdateModeValParamMask: updateTypes[String(_.getOr(200, 'lastUpdateModeValParamMask', store))],
        } : {
          validityParameterId: '',
          validityParameterName: '',
          validityParameterMask: '',
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

    data = injectTabularData(
      data,
      'parameterMonitoringDefinitions',
      _.getOr([], ['dataForTables', 'pus012ParameterMonitoringDefinition'], data)
      .map(store => ({
        ...selectExpectedData(store),
        ...getELData(store),
        ...getHData(store),
      }))
    );

    data = _.omit(['dataForTables'], data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    data,
    domain: _.getOr(null, ['entryPoints', 0, 'connectedData', 'domain'], config),
    timeline: _.getOr(null, ['entryPoints', 0, 'connectedData', 'timeline'], config),
    windowId,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const PUS12ViewContainer =
  connect(
    mapStateToProps,
    mergeProps
  )(PUS12View);

PUS12ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS12ViewContainer;
