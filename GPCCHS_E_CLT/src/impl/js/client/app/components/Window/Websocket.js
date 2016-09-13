import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class Websocket extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    err: PropTypes.string,
  };
  render() {
    let style = '';
    switch (this.props.status) {
      case 'connected':
        style = 'success';
        break;
      case 'error':
        style = 'danger';
        break;
      default:
        style = 'default';
    }

    return (
      <div className="dib">
        <Button bsStyle={style}>
          status: {this.props.status}
          {(this.props.err) ? `(Error: ${this.props.err.message})` : ''}
        </Button>
      </div>
    );
  }
}
