import _ from 'lodash/fp';
import classnames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';
import { Alert } from 'react-bootstrap';
import split from 'lodash/fp/split';
import styles from './Message.css';

export default class Message extends PureComponent {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onHover: PropTypes.func,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    removing: PropTypes.bool,
  };

  static defaultProps = {
    onHover: _.noop,
    removing: false,
  }

  willClose = () => {
    this.props.onClose();
  }
  render() {
    const onHover = this.props.removing ? this.props.onHover : _.noop;
    return (
      <span>
        <Alert
          onMouseEnter={onHover}
          bsStyle={this.props.type}
          className={classnames({ [styles.removing]: this.props.removing })}
          onDismiss={this.props.removing ? _.noop : this.willClose}
        >
          {split('\n', this.props.message).map(x => (
            <div key={x}>{x}</div>
          ))}
        </Alert>
      </span>
    );
  }

}
