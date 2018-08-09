import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { getData } from 'viewManager/PUS140View/store/dataReducer';
import PUS140View from './PUS140View';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  return {
    serviceApid: _.getOr(0, 'serviceApid', data), // no serviceApid provided
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

const PUS140ViewContainer =
  connect(
    mapStateToProps,
    mergeProps
  )(PUS140View);

PUS140ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS140ViewContainer;
