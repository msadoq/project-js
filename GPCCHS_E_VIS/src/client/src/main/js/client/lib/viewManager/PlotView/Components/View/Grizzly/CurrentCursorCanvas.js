import React, { PropTypes, PureComponent } from 'react';
import styles from './GrizzlyChart.css';

export default class CurrentCursorCanvas extends PureComponent {

  static propTypes = {
    yAxesAt: PropTypes.string.isRequired,
    margin: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
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
      yAxesAt,
      top,
      margin,
    } = this.props;

    const style = {};
    // horizontal position
    if (yAxesAt === 'left') {
      style.left = margin;
    } else if (yAxesAt === 'right') {
      style.right = margin;
    }

    // vertical position
    style.top = top;

    return (
      <canvas
        ref={this.assignEl}
        height={height}
        width={width}
        className={styles.canvas}
        style={style}
      />
    );
  }
}
