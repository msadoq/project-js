import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';

import parameters from 'common/configurationManager';
import { getPUSViewData } from 'viewManager/common/pus/dataSelectors';
import { PUS_SERVICE_142 } from 'constants';
import PUS142View from './PUS142View';

import { getWindowIdByViewId } from '../../../../store/selectors/windows';
import { injectTabularData } from '../../../commonData/reducer';

const mapStateToProps = (state, { viewId }) => {
  const checkingStatuses = parameters.get('PUS_CONSTANTS').FUNCTIONAL_MONITORING_CHECKING_STATUS;
  const statuses = parameters.get('PUS_CONSTANTS').STATUS;
  const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

  let data = getPUSViewData(state, { viewId, pusService: PUS_SERVICE_142 });

  if (typeof data === 'object' && Object.keys(data).length > 0) {
    for (let i = 0; i < data.headers.length; i += 1) {
      data.headers[i].serviceApidName = _.getOr(null, 'serviceApidName', data.headers[i]);
      data.headers[i].serviceApid = _.getOr(null, 'serviceApid', data.headers[i]);
      data.headers[i].serviceStatus = statuses[String(_.getOr(200, 'serviceStatus', data.headers[i]))];
      data.headers[i].lastUpdateModeServiceStatus = updateTypes[String(_.getOr(200, 'lastUpdateModeServiceStatus', data.headers[i]))];
      data.headers[i].lastUpdateTimeServiceStatus = _.getOr(null, 'lastUpdateTimeServiceStatus', data.headers[i]);
    }

    data = injectTabularData(
      data,
      'functionalMonitoring',
      _.getOr([], ['dataForTables', 'pus142FunctionalMonitoring'], data)
        .map(functional => ({
          ...functional,
          status: statuses[String(_.getOr(200, 'status', functional))],
          ridStatus: statuses[String(_.getOr(200, 'ridStatus', functional))],
          actionStatus: statuses[String(_.getOr(200, 'actionStatus', functional))],
          checkingStatus: checkingStatuses[_.getOr(200, 'checkingStatus', functional)],
          lastUpdateModeFMonId: updateTypes[String(_.getOr(200, 'lastUpdateModeFMonId', functional))],
          lastUpdateModeCurrentValue: updateTypes[String(_.getOr(200, 'lastUpdateModeCurrentValue', functional))],
          lastUpdateModeStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeStatus', functional))],
          lastUpdateModeCheckingStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeCheckingStatus', functional))],
          lastUpdateModeProtectionStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeProtectionStatus', functional))],
          lastUpdateModeRidStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeRidStatus', functional))],
          lastUpdateModeValidParamId: updateTypes[String(_.getOr(200, 'lastUpdateModeValidParamId', functional))],
          lastUpdateModeValidParamMask: updateTypes[String(_.getOr(200, 'lastUpdateModeValidParamMask', functional))],
          lastUpdateModeValidParamExpectedValue: updateTypes[String(_.getOr(200, 'lastUpdateModeValidParamExpectedValue', functional))],
          lastUpdateModeActionStatus: updateTypes[String(_.getOr(200, 'lastUpdateModeActionStatus', functional))],
        }))
    );
    data = injectTabularData(
      data,
      'parameterMonitorings',
      _.uniqBy(
        'fMonId',
        _.getOr([], ['dataForTables', 'pus142FunctionalMonitoring'], data)
          .reduce((acc, store) => [...acc, ...store.pus142ParameterMonitoringDefinition], [])
      ).map(param => ({
        ...param,
        lastUpdateModeId: updateTypes[String(_.getOr(200, 'lastUpdateModeId', param))],
      }))
    );
    data = _.omit(['dataForTables'], data);
  }

  const windowId = getWindowIdByViewId(state, { viewId });
  return {
    data,
    windowId,
  };
};

const PUS142ViewContainer = connect(mapStateToProps, null)(PUS142View);

PUS142ViewContainer.propTypes = { viewId: PropTypes.string.isRequired };

export default PUS142ViewContainer;
