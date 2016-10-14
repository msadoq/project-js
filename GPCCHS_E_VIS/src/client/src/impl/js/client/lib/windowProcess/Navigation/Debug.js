import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Debug extends Component {
  static propTypes = {};

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button
          href="http://127.0.0.1:3000/debug/"
          target="_blank"
        >
          {'DEBUG'}
        </Button>
      </div>
    );
  }
}
