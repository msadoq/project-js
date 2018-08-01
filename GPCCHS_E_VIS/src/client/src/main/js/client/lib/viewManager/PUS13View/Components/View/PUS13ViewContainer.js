import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { getData } from 'viewManager/PUS13View/store/dataReducer';
import PUS13View from './PUS13View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    serviceApid: _.getOr(null, 'serviceApid', data),
    noOfParameterMonitoringDefinition: _.getOr(null, 'noOfParameterMonitoringDefinition', data),
    serviceStatus: _.getOr(null, 'serviceStatus', data),
    lastUpdateModeServiceStatus: _.getOr(null, 'lastUpdateModeServiceStatus', data),
    lastUpdateTimeServiceStatus: _.getOr(null, 'lastUpdateTimeServiceStatus', data),
    apids: _.getOr(null, ['entryPoints', 0, 'connectedData', 'apids'], config),
    windowId,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const PUS13ViewContainer =
  connect(
    mapStateToProps,
    mergeProps
  )(PUS13View);

PUS13ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS13ViewContainer;
