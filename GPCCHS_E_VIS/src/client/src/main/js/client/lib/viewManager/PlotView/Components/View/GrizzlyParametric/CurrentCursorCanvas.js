import React, { PropTypes, PureComponent } from 'react';
import styles from './GrizzlyChart.css';

export default class CurrentCursorCanvas extends PureComponent {

  static propTypes = {
    divStyle: PropTypes.shape().isRequired,
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
      divStyle,
    } = this.props;

    const x = xScale(current);
    const ctx = this.el.getContext('2d');
    ctx.strokeStyle = '#1E2';
    ctx.fillStyle = '#1E2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.clearRect(0, 0, divStyle.width, divStyle.height);
    ctx.moveTo(x, divStyle.height);
    ctx.lineTo(x, 0);
    ctx.stroke();
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      divStyle,
    } = this.props;

    return (
      <canvas
        ref={this.assignEl}
        height={divStyle.height}
        width={divStyle.width}
        className={styles.canvas}
        style={divStyle}
      />
    );
  }
}
