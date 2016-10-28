import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { updateVisuWindow } from '../../store/actions/timebars';
import styles from './Timebar.css';
import Timebar from './Timebar';


class TimebarContainer extends Component {

  static propTypes = {
    updateVisuWindow: React.PropTypes.func.isRequired,
  }

  state = { height: 120 };

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

  render() {
    const { updateVisuWindow } = this.props;
    let hrKlasses = styles.resizeTimebarContainer;
    if (this.state.resizingWindow) {
      hrKlasses += ` ${styles.resizingTimebarContainer}`;
    }

    return (
      <div style={{ height: this.state.height }}>
        <Col xs={12} style={{ paddingBottom: 18 }}>
          <div><hr onMouseDown={this.resizeWindow} className={hrKlasses} /></div>
        </Col>
        <Col xs={3}>
          <div><h2>hihi</h2></div>
        </Col>
        <Col xs={9} style={{ height: '100%' }}>
          <Timebar {...this.props} onChange={updateVisuWindow} />
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
}, {
  updateVisuWindow
})(TimebarContainer);
