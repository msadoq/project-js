import _ from 'lodash/fp';
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
    removing: PropTypes.bool,
  };

  static defaultProps = {
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
        className={classnames({ [styles.removing]: this.props.removing })}
        onDismiss={this.props.removing ? _.noop : this.willClose}
      >
        {split('\n', this.props.message).map(x => (
          <div key={x}>{x}</div>
        ))}
      </Alert>
    );
  }

}
