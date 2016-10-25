import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import visibleRemoteIds from '../../common/data/map/visibleRemoteIds';
import visibleViews from '../../common/data/map/visibleViews';

export default class Timebar extends Component {
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  visibleRemoteIds = () => {
    const state = this.context.store.getState();
    return console.log(visibleRemoteIds(state)); // eslint-disable-line no-console
  };
  visibleViews = () => {
    const state = this.context.store.getState();
    return console.log(visibleViews(state)); // eslint-disable-line no-console
  };
  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button onClick={this.visibleRemoteIds}>VISIBLE MAP</Button>
        {' '}
        <Button onClick={this.visibleViews}>VIEW MAP</Button>
      </div>
    );
  }
}
