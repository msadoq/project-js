/* eslint-disable no-unused-vars,arrow-body-style */
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { open as openModal } from 'store/actions/modals';
import PUS11View from './PUS11View';
import { getConfigurationByViewId } from '../../../selectors';

const mapStateToProps = (state, { viewId }) => {
  const config = getConfigurationByViewId(state, { viewId });

  return {
    applicationProcessName: _get(config, ['entryPoints', 0, 'connectedData', 'apidName'], null),
    applicationProcessId: _get(config, ['entryPoints', 0, 'connectedData', 'apidRawValue'], null),
    scheduleStatus: 'ENABLED',
    availableSpace: '1000',
    spaceType: 'Bytes',
    lastUpdateTime: 1527520025823,
    lastUpdateType: 'TM',
  };
};

const mapDispatchToProps = {
  openModal,
};

const PUS11ViewContainer = connect(mapStateToProps, mapDispatchToProps)(PUS11View);

PUS11ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS11ViewContainer;
