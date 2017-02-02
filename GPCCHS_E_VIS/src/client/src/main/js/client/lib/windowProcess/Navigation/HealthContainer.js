import { connect } from 'react-redux';
import {
  getLastPubSubTimestamp,
  getDcStatus,
  getHssStatus,
} from '../../store/selectors/health';
import Health from './Health';

const mapStateToStore = state => ({
  lastPubSubTimestamp: getLastPubSubTimestamp(state),
  dcStatus: getDcStatus(state),
  hssStatus: getHssStatus(state),
});

export default connect(mapStateToStore)(Health);
