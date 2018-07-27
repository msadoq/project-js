import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { getData } from 'viewManager/PUS15View/store/dataReducer';
import PUS15View from './PUS15View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });


  return {
    serviceApid: _.getOr(null, 'serviceApid', data),
    serviceApidName: _.getOr(null, 'serviceApidName', data),
    apids: _.getOr(null, ['entryPoints', 0, 'connectedData', 'apids'], config),
    windowId,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const PUS15ViewContainer =
  connect(
    mapStateToProps,
    mergeProps
  )(PUS15View);

PUS15ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS15ViewContainer;
