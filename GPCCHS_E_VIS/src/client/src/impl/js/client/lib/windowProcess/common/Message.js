import classnames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';
import { Alert } from 'react-bootstrap';
import styles from './Message.css';

export default class Message extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    instanceType: PropTypes.string.isRequired,
    instanceId: PropTypes.string,
    messageIndex: PropTypes.number.isRequired,
  };

  state = {
    alertVisible: true,
    removing: false,
  }

  willClose = () => {
    this.setState({
      removing: true,
    });
    setTimeout(() => {
      if (this.props.instanceId) {
        this.props.onClose(
          this.props.instanceType,
          this.props.messageIndex,
          this.props.instanceId
        );
      } else {
        this.props.onClose(
          this.props.instanceType,
          this.props.messageIndex
        );
      }
    }, 600);
  }
  render() {
    return (
      <Alert
        bsStyle={this.props.type}
        className={classnames(
          this.state.removing ? 'removing' : '',
          { [styles.removing]: this.state.removing }
        )}
        onDismiss={this.willClose}
      >
        {this.props.message}
      </Alert>
    );
  }

}
