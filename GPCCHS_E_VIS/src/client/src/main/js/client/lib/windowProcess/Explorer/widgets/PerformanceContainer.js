import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getHealthMapForWindow } from '../../../store/selectors/health';

import Performance from './Performance';

const PerformanceContainer = connect((state, { windowId }) => ({
  ...getHealthMapForWindow(state, { windowId }),
}))(Performance);

PerformanceContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default PerformanceContainer;
