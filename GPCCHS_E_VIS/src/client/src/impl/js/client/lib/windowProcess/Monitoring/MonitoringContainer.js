import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getLastPubSubTimestamp,
  getDcStatus,
  getHssStatus,
} from '../../store/selectors/monitoring';
import { updateMonitoring } from '../../store/actions/monitoring';
import Monitoring from './Monitoring';

const mapStateToStore = state => ({
  lastPubSubTimestamp: getLastPubSubTimestamp(state),
  dcStatus: getDcStatus(state),
  hssStatus: getHssStatus(state),
});

function mapDispatchToProps(dispatch, { monitoring }) {
  return bindActionCreators({
    updateMonitoring: () => updateMonitoring(monitoring),
  }, dispatch);
}

export default connect(mapStateToStore, mapDispatchToProps)(Monitoring);
