// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #6835 : 31/05/2017 : First draft for parametric PlotView, x axis becomes basic axis with numb values.
// VERSION : 1.1.2 : DM : #6835 : 28/08/2017 : PlotView is never parametric, fixed positionned tooltip in Parametric and PlotView.
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Simplified style for canvas divs and tooltip divs, calculated only once in main Chart component.
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
import styles from './GrizzlyChart.css';

export default class CurrentCursorCanvas extends PureComponent {

  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    divStyle: PropTypes.shape().isRequired,
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw = () => {
    const {
      current,
      xScale,
      height,
      width,
    } = this.props;

    const ctx = this.el.getContext('2d');

    ctx.clearRect(0, 0, width, height);
    // =============== DRAWING
    ctx.beginPath();
    ctx.strokeStyle = '#11EE22';
    ctx.lineWidth = 2;
    ctx.moveTo(xScale(current), 0);
    ctx.lineTo(xScale(current), height);
    ctx.stroke();
    // ===============
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      height,
      width,
      divStyle,
    } = this.props;

    return (
      <canvas
        ref={this.assignEl}
        height={height}
        width={width}
        className={styles.canvas}
        style={divStyle}
      />
    );
  }
}
