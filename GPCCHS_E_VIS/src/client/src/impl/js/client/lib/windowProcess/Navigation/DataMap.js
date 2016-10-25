import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import visibleRemoteIds from '../../common/data/map/visibleRemoteIds';

export default class Timebar extends Component {
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  display() {
    const state = this.context.store.getState();
    return console.log(visibleRemoteIds(state)); // eslint-disable-line no-console
  }
  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button onClick={this.display.bind(this)}>DATA MAP</Button>
      </div>
    );
  }
}
