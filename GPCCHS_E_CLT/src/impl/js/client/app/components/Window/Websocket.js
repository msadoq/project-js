import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class Websocket extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    err: PropTypes.string,
    disconnect: PropTypes.func,
    connect: PropTypes.func,
    stub: PropTypes.bool.isRequired,
    toggleStub: PropTypes.func,
  };
  render() {
    let status = '';
    let style = '';
    let onClick = () => {};
    switch (this.props.status) {
      case 'connect':
      case 'reconnect':
        status = 'online';
        style = 'success';
        onClick = this.props.disconnect;
        break;
      case 'connect_error':
      case 'reconnect_error':
      case 'reconnect_failed' :
        if (this.props.err) {
          status = `error (${this.props.err.message})`;
        } else {
          status = 'error';
        }
        style = 'danger';
        break;
      case 'connect_timeout':
        status = 'timeout';
        style = 'danger';
        break;
      case 'reconnect_attempt':
      case 'reconnecting':
        status = 'reconnecting';
        style = 'default';
        break;
      default:
        status = 'offline';
        style = 'default';
        onClick = this.props.connect;
    }

    return (
      <div className="dib">
        <Button bsStyle={style} onClick={onClick}>
          status: {status}
        </Button>
        <Button onClick={this.props.toggleStub}>
          stub: {(this.props.stub) ? 'on' : 'off'}
        </Button>
      </div>
    );
  }
}
