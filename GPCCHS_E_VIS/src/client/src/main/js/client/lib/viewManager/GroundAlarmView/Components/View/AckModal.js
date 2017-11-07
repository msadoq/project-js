/* eslint-disable arrow-body-style */
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash/fp';

const TextArea = ({ onChange, maxLength }) => (
  <div>
    <textarea
      style={{ maxWidth: '100%', width: '100%', height: '44px' }}
      maxLength={maxLength}
      onChange={onChange}
    />
  </div>
);
TextArea.propTypes = {
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
};
TextArea.defaultProps = {
  maxLength: 100,
  onChange: _.noop,
};


class AckModal extends React.Component {
  static propTypes = {
    ackStatus: PropTypes.shape({
      acknowledging: PropTypes.bool.isRequired,
      alarmsTimestamps: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        ackError: PropTypes.string,
        acknowledged: PropTypes.bool.isRequired,
      }).isRequired).isRequired,
    }),
    sendAck: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    alarms: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      parameterName: PropTypes.string.isRequired,
      lastOccurence: PropTypes.string.isRequired,
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
    const isCompleted = ({ acknowledged, ackError }) => Boolean(ackError) || acknowledged;
    if (_.every(isCompleted, nextProps.ackStatus.alarmsTimestamps)) {
      setTimeout(this.props.closeModal, 120); // UX : let the user to apprehend the behavior
    }
  }

  onCommentChange = e => this.setState(_.set('comment', e.target.value))

  onAckClick = () => {
    this.props.sendAck(this.state.comment);
  }

  render() {
    const { alarms } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <ListGroup>
          {
            alarms.map(alarm => (
              <ListGroupItem key={alarm.timestamp}>
                {`${alarm.parameterName} - ${alarm.lastOccurence}`}
              </ListGroupItem>
            ))
          }
        </ListGroup>
        <FormControl onChange={this.onCommentChange} componentClass={TextArea} />
        <hr />
        <Button
          disabled={this.props.ackStatus.acknowledging}
          onClick={this.onAckClick}
          bsStyle="primary"
          bsSize="small"
        >
          {this.props.ackStatus.acknowledging ? 'Acknowledging...' : 'Acknowledge'}
        </Button>
      </div>
    );
  }
}

export default AckModal;
