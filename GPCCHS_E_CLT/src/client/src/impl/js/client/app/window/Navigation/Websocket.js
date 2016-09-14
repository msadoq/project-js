import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';

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
      <div className='dib ml5 mt5'>
        main process websocket:
        {' '}
        <Label bsStyle={style}>{this.props.status}</Label>
        <strong>
          {(this.props.err) ? `(Error: ${this.props.err.message})` : ''}
        </strong>
      </div>
    );
  }
}
