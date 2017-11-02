/* eslint-disable arrow-body-style */
import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash/fp';

class AckModal extends React.Component {
  static propTypes = {
    sendAck: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    alarms: PropTypes.arrayOf(PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      parameterName: PropTypes.string.isRequired,
      lastOccurence: PropTypes.string.isRequired,
    })).isRequired,
  }

  state = { reason: '' }

  onReasonChange = e => this.setState(_.set('reason', e.target.value))

  onAckClick = () => {
    this.props.sendAck(this.props.alarms, this.state.reason);
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
                {`${alarm.RIDName} - ${alarm.onBoardDate}`}
              </ListGroupItem>
            ))
          }
        </ListGroup>
        <FormControl onChange={this.onReasonChange} componentClass="textarea" />
        <Button onClick={this.onAckClick} bsStyle="primary" bsSize="small">
          Acknowledge
        </Button>
      </div>
    );
  }
}

export default AckModal;
