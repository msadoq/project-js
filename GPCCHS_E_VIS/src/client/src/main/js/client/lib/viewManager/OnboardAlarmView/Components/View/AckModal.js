/* eslint-disable arrow-body-style */
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash/fp';

class AckModal extends React.Component {
  static propTypes = {
    ackStatus: PropTypes.shape({
      acknowledging: PropTypes.bool.isRequired,
      alarmsTimestamps: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.string.isRequired,
        ackError: PropTypes.string,
        acknowledged: PropTypes.bool.isRequired,
      }).isRequired).isRequired,
    }),
    sendAck: PropTypes.func.isRequired,
    // closeModal: PropTypes.func.isRequired,
    alarms: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      RIDName: PropTypes.string.isRequired,
      onBoardDate: PropTypes.string.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    ackStatus: {
      acknowledging: false,
      alarmsTimestamps: [],
    },
  }

  state = { comment: '' }

  onCommentChange = e => this.setState(_.set('comment', e.target.value))

  onAckClick = () => {
    this.props.sendAck(this.state.comment);
    // this.props.closeModal();
  }

  render() {
    const { alarms, ackStatus } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        <ListGroup>
          {
            alarms.map(alarm => (
              <ListGroupItem key={alarm.timestamp}>
                {`${alarm.RIDName} - ${alarm.onBoardDate}`}
              </ListGroupItem>
            ))
          }
        </ListGroup>
        <FormControl onChange={this.onCommentChange} componentClass="textarea" />
        <Button
          disabled={ackStatus.acknowledging}
          onClick={this.onAckClick}
          bsStyle="primary"
          bsSize="small"
        >
          {ackStatus.acknowledging ? 'Acknowledging...' : 'Acknowledge'}
        </Button>
      </div>
    );
  }
}

export default AckModal;
