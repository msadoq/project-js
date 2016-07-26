import React, { Component, PropTypes } from 'react';
import { Label, Button } from 'react-bootstrap';

export default class Websocket extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    err: PropTypes.string,
    disconnect: PropTypes.func,
    connect: PropTypes.func,
  };
  render() {
    let status = '';
    let style = '';
    let links = null;
    switch (this.props.status) {
      case 'connect':
      case 'reconnect':
        status = 'online';
        style = 'success';
        links = (<Button onClick={this.props.disconnect}>disconnect</Button>);
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
        links = (<Button onClick={this.props.connect}>connect</Button>);
    }

    return (
      <h4>
        <Label bsStyle={style}>{status}</Label>
        {links}
      </h4>
    );
  }
}
