import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { getData } from 'viewManager/PUS144View/store/dataReducer';
import PUS144View from './PUS144View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });


  return {
    serviceApid: _.getOr(null, 'serviceApid', data),
    apids: _.getOr(null, ['entryPoints', 0, 'connectedData', 'apids'], config),
    windowId,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
});

const PUS144ViewContainer =
  connect(
    mapStateToProps,
    mergeProps
  )(PUS144View);

PUS144ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS144ViewContainer;
