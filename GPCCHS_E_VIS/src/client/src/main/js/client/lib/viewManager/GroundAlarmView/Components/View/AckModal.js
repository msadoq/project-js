/* eslint-disable arrow-body-style */
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash/fp';

class AckModal extends React.Component {
  static propTypes = {
    sendAck: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    alarms: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      parameterName: PropTypes.string.isRequired,
      lastOccurence: PropTypes.string.isRequired,
    })).isRequired,
  }

  state = { comment: '' }

  onCommentChange = e => this.setState(_.set('comment', e.target.value))

  onAckClick = () => {
    this.props.sendAck(this.props.alarms, this.state.comment);
    this.props.closeModal();
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
        <FormControl onChange={this.onCommentChange} componentClass="textarea" />
        <Button onClick={this.onAckClick} bsStyle="primary" bsSize="small">
          Acknowledge
        </Button>
      </div>
    );
  }
}

export default AckModal;
