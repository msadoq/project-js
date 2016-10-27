import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import { updateVisuWindow } from '../../store/actions/timebars';
import styles from './Timebar.css';
import Timebar from './Timebar';


class TimebarContainer extends Component{
  constructor(...args) {
    super(...args);
    this.state = { height: 120 };
  }

  dispatchCursor = (...args) => {
    this.props.dispatch(updateVisuWindow(
      this.props.focusedPage.timebarId,
      ...args
    ));
  }

  resizeWindow = (e) => {
    this.setState({
      resizingWindow: true,
      cursorOriginY: e.pageY,
      heightOrigin: this.state.height
    });

    document.addEventListener('mousemove', this.resizeWindowMouseMove);
    document.addEventListener('mouseup', this.resizeWindowMouseUp);
    e.stopPropagation();
  }

  resizeWindowMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.resizingWindow) {
      const movedPx = this.state.cursorOriginY - e.pageY;
      this.setState({
        height: this.state.heightOrigin + (movedPx * 3)
      });
    }
  }

  resizeWindowMouseUp = (e) => {
    document.removeEventListener('mousemove', this.resizeWindowMouseMove);
    document.removeEventListener('mouseup', this.resizeWindowMouseUp);
    this.setState({ resizingWindow: false });
    e.preventDefault();
  }

  ProtoTypes: {
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow:  React.PropTypes.object.isRequired,
    dispatch:    React.PropTypes.func.isRequired,
  }

  render() {
    let hrKlasses = styles.resizeTimebarContainer;
    if (this.state.resizingWindow) {
      hrKlasses += ` ${styles.resizingTimebarContainer}`;
    }

    return (
      <div style={{ height: `${this.state.height}px` }}>
        <Col xs={12} style={{ paddingBottom: '18px' }}>
          <div><hr onMouseDown={this.resizeWindow} className={hrKlasses} /></div>
        </Col>
        <Col xs={3}>
          <div><h2>hihi</h2></div>
        </Col>
        <Col xs={9}>
          <Timebar {...this.props} onDispatch={this.dispatchCursor} />
        </Col>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const { timebarId } = ownProps.focusedPage;
  return {
    visuWindow: get(state, ['timebars', timebarId, 'visuWindow']),
  };
})(TimebarContainer);
