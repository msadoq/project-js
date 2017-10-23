import _ from 'lodash/fp';
import { connect } from 'react-redux';

import { sendAlarmAck } from '../../store/actions';
import AckModal from './AckModal';

const mapStateToProps = _.always({});

const mapDispatchToProps = {
  sendAck: sendAlarmAck,
};

export default connect(mapStateToProps, mapDispatchToProps)(AckModal);
