/* eslint-disable no-unused-vars,arrow-body-style */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PUS11View from './PUS11View';

const mapStateToProps = (state, { viewId }) => {
  return {
    applicationProcessName: 'ORBIT',
    applicationProcessId: 2,
    scheduleStatus: 'ENABLED',
    availableSpace: '1000',
    spaceType: 'Bytes',
    lastUpdateTime: Date.now(),
    lastUpdateType: 'TM',
    subScheduleList: [
      { apid: 9, ssid: 87, name: 'xxx', status: 'disabled', firstTCTime: Date.now() },
      { apid: 9, ssid: 90, name: 'xxx', status: 'disabled', firstTCTime: Date.now() },
      { apid: 11, ssid: 247, name: 'xxx', status: 'disabled', firstTCTime: Date.now() },
      { apid: 11, ssid: 642, name: 'xxx', status: 'disabled', firstTCTime: Date.now() },
    ],
    enabledApidList: [
      { apid: 9, name: 'OBCENGINE2' },
      { apid: 11, name: 'APID11' },
    ],
    tcList: [
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
      { apid: 9, ssid: 87, cmdName: 'xxx', cmdDescription: 'xxx', cmdApName: 'xxx', seqCount: 28, sourceId: 'xxx', cmdStatus: 'ENABLED', groundStatus: 'DISABLED', initExecTime: Date.now(), curExecTime: Date.now(), totShiftTime: 0 },
    ],
  };
};

const PUS11ViewContainer = connect(mapStateToProps, {})(PUS11View);

PUS11ViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PUS11ViewContainer;
