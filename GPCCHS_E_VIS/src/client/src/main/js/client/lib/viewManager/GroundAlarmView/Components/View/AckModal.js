/* eslint-disable arrow-body-style */
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash/fp';

const TextArea = ({ onChange, maxLength, disabled }) => (
  <div>
    <textarea
      disabled={disabled}
      style={{ maxWidth: '100%', width: '100%', height: '44px' }}
      maxLength={maxLength}
      onChange={onChange}
    />
  </div>
);
TextArea.propTypes = {
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
};
TextArea.defaultProps = {
  disabled: false,
  maxLength: 100,
  onChange: _.noop,
};

class AckModal extends React.Component {
  static propTypes = {
    ackType: PropTypes.string.isRequired,
    ackStatus: PropTypes.shape({
      acknowledging: PropTypes.bool.isRequired,
      alarmsTimestamps: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.string.isRequired,
        ackError: PropTypes.string,
        acknowledged: PropTypes.bool.isRequired,
      }).isRequired).isRequired,
    }),
    sendAck: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    alarms: PropTypes.arrayOf(PropTypes.shape({
      parameterName: PropTypes.string,
      lastOccurence: PropTypes.string,
      onBoardDate: PropTypes.string,
      RIDName: PropTypes.string,
    })).isRequired,
  }

  static defaultProps = {
    ackStatus: {
      acknowledging: false,
      alarmsTimestamps: [],
    },
  }

  state = { comment: '' }

  componentWillReceiveProps(nextProps) {
    const isCompleted = ({ acknowledged }) => acknowledged;
    if (_.every(isCompleted, nextProps.ackStatus.alarmsTimestamps)) {
      setTimeout(this.props.closeModal, 220); // UX : let the user to apprehend the behavior
    }
  }

  onCommentChange = e => this.setState(_.set('comment', e.target.value))

  onAckClick = () => {
    this.props.sendAck(this.state.comment);
  }

  getAlarmLabel = (alarm) => {
    if (this.props.ackType === 'gma') {
      return `${alarm.parameterName} - ${alarm.lastOccurence}`;
    }
    return `${alarm.RIDName} - ${alarm.onBoardDate}`;
  }

  getStatusByTimestamp = (timestamp) => {
    const alarmsTimestamps = this.props.ackStatus.alarmsTimestamps;
    const alarmStatus = _.find(_.propEq('timestamp', timestamp), alarmsTimestamps);
    if (!alarmStatus) {
      return undefined;
    }
    if (alarmStatus.acknowledged) {
      return 'success';
    } else if (alarmStatus.ackError) {
      return 'danger';
    }
    return undefined;
  }

  getButtonTitle = () => {
    if (this.hasAckError()) {
      return 'There are some acknowledge errors';
    }
    if (this.props.ackStatus.acknowledging) {
      return 'Acknowledging...';
    }
    return 'Acknowledge';
  }

  hasAckError = () => {
    const hasError = ({ ackError }) => Boolean(ackError);
    return _.some(hasError, this.props.ackStatus.alarmsTimestamps);
  }

  render() {
    const { alarms } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <ListGroup>
          {
            alarms.map(alarm => (
              <ListGroupItem
                bsStyle={this.getStatusByTimestamp(alarm.oid)}
                key={alarm.timestamp}
              >
                {this.getAlarmLabel(alarm)}
              </ListGroupItem>
            ))
          }
        </ListGroup>
        <FormControl
          disabled={this.props.ackStatus.acknowledging}
          onChange={this.onCommentChange}
          componentClass={TextArea}
        />
        <hr />
        <Button
          disabled={this.props.ackStatus.acknowledging}
          onClick={this.onAckClick}
          bsStyle={this.hasAckError() ? 'danger' : 'primary'}
          bsSize="small"
        >
          {this.getButtonTitle()}
        </Button>
      </div>
    );
  }
}

export default AckModal;
