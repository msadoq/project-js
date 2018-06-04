/* eslint-disable no-unused-vars,arrow-body-style */
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { open as openModal } from 'store/actions/modals';
import PUS05View from './PUS05View';
import { getConfigurationByViewId } from '../../../selectors';

const mapStateToProps = (state, { viewId }) => {
  const config = getConfigurationByViewId(state, { viewId });

  return {
    applicationProcessName: _get(config, ['entryPoints', 0, 'connectedData', 'apidName'], null),
    applicationProcessId: _get(config, ['entryPoints', 0, 'connectedData', 'apidRawValue'], null),
    onBoardEvents: [
      { rid: 3005, ridLabel: 'xxx', name: 'ORB_TM_ANHE', status: 'xxx', eventShortDescription: 'TM 5.4 Instance', eventDefaultStatus: 'TM', alarmLevel: 'xxx', actionName: 'xxx', eventLongDescription: 'xxx', updateType: 'TM', updateTime: 1527520025823 },
      { rid: 3005, ridLabel: 'xxx', name: 'ORB_TM_ANHE', status: 'xxx', eventShortDescription: 'TM 5.4 Instance', eventDefaultStatus: 'TM', alarmLevel: 'xxx', actionName: 'xxx', eventLongDescription: 'xxx', updateType: 'TM', updateTime: 1527520025823 },
      { rid: 3005, ridLabel: 'xxx', name: 'ORB_TM_ANHE', status: 'xxx', eventShortDescription: 'TM 5.4 Instance', eventDefaultStatus: 'TM', alarmLevel: 'xxx', actionName: 'xxx', eventLongDescription: 'xxx', updateType: 'TM', updateTime: 1527520025823 },
      { rid: 3005, ridLabel: 'xxx', name: 'ORB_TM_ANHE', status: 'xxx', eventShortDescription: 'TM 5.4 Instance', eventDefaultStatus: 'TM', alarmLevel: 'xxx', actionName: 'xxx', eventLongDescription: 'xxx', updateType: 'TM', updateTime: 1527520025823 },
      { rid: 3005, ridLabel: 'xxx', name: 'ORB_TM_ANHE', status: 'xxx', eventShortDescription: 'TM 5.4 Instance', eventDefaultStatus: 'TM', alarmLevel: 'xxx', actionName: 'xxx', eventLongDescription: 'xxx', updateType: 'TM', updateTime: 1527520025823 },
    ],
    receivedOnBoardEvents: [
      { onBoardTime: 1527520025823, receptionTime: 1527520025823, rid: 3005, ridLabel: 'xxx', name: 'xxx', reportType: 'xxx' },
      { onBoardTime: 1527520025823, receptionTime: 1527520025823, rid: 3005, ridLabel: 'xxx', name: 'xxx', reportType: 'xxx' },
      { onBoardTime: 1527520025823, receptionTime: 1527520025823, rid: 3005, ridLabel: 'xxx', name: 'xxx', reportType: 'xxx' },
      { onBoardTime: 1527520025823, receptionTime: 1527520025823, rid: 3005, ridLabel: 'xxx', name: 'xxx', reportType: 'xxx' },
      { onBoardTime: 1527520025823, receptionTime: 1527520025823, rid: 3005, ridLabel: 'xxx', name: 'xxx', reportType: 'xxx' },
    ],
  };
};

const mapDispatchToProps = {
  openModal,
};

const PUS05ViewContainer = connect(mapStateToProps, mapDispatchToProps)(PUS05View);

PUS05ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS05ViewContainer;
