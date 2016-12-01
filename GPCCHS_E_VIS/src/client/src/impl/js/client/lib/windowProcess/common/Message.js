import React, { PropTypes, PureComponent } from 'react';
import { Alert } from 'react-bootstrap';


export default class Message extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  };

  state = {
    alertVisible: true,
    removing: false,
  }

  willClose = () => {
    this.setState({
      removing: true,
    });
    setTimeout(this.props.onClose, 600);
  }
  render() {
    return (
      <Alert bsStyle={this.props.type} className={this.state.removing ? 'removing' : ''} onDismiss={this.willClose}>
        {this.props.message}
      </Alert>
    );
  }

}
