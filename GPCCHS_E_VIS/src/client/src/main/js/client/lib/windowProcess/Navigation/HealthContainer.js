import { connect } from 'react-redux';
import {
  getLastPubSubTimestamp,
  getDcStatus,
  getHssStatus,
} from '../../store/selectors/health';
import Health from './Health';

const mapStateToStore = state => ({
  dcStatus: getDcStatus(state),
  hssStatus: getHssStatus(state),
  lastPubSubTimestamp: getLastPubSubTimestamp(state),
});

export default connect(mapStateToStore)(Health);
