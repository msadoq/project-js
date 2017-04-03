import classnames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';
import { Alert } from 'react-bootstrap';
import split from 'lodash/fp/split';
import styles from './Message.css';

export default class Message extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
  };

  state = {
    alertVisible: true,
    removing: false,
  }

  willClose = () => {
    this.setState({
      removing: true,
    });
    this.props.onClose(this.props.containerId);
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
        {split('\n', this.props.message).map(x => (
          <div key={x}>{x}</div>
        ))}
      </Alert>
    );
  }

}
