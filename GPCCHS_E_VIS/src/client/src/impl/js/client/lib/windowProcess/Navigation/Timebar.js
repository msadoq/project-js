import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { updateVisuWindow } from '../../store/actions/timebars';

export default class Timebar extends Component {
  static propTypes = {};
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  moveForward() {
    const state = this.context.store.getState();
    const timebarId = Object.keys(state.timebars)[0];
    const { visuWindow } = state.timebars[timebarId];
    if (!visuWindow) {
      console.log('no timebar');
      return null;
    }
    this.context.store.dispatch(updateVisuWindow(
      timebarId,
      visuWindow.lower + 10000,
      visuWindow.upper + 10000,
      visuWindow.current + 10000
    ));
  }
  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button onClick={this.moveForward.bind(this)}>MOVE 10s</Button>
      </div>
    );
  }
}
