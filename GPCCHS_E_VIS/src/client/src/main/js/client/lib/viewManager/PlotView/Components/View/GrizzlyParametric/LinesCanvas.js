import React, { Component, PropTypes } from 'react';
import styles from './GrizzlyChart.css';
import { drawLinesCanvas, shouldRenderComponent } from './LineCanvasCommon';

export default class LinesCanvas extends Component {

  static propTypes = {
    updateLabelPosition: PropTypes.func.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    showLabelsX: PropTypes.bool,
    showLabelsY: PropTypes.bool,
    perfOutput: PropTypes.bool,
    data: PropTypes.objectOf(PropTypes.shape).isRequired,
    indexes: PropTypes.objectOf(PropTypes.shape).isRequired,
    current: PropTypes.number.isRequired,
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        xAxisId: PropTypes.string.isRequired,
        yAxisId: PropTypes.string.isRequired,
        fill: PropTypes.string,
        lineStyle: PropTypes.string,
        lineSize: PropTypes.number,
        pointSize: PropTypes.number,
        pointStyle: PropTypes.string,
        xAccessor: PropTypes.func,
        yAccessor: PropTypes.func,
        colorAccessor: PropTypes.string,
      })
    ).isRequired,
    divStyle: PropTypes.shape().isRequired,
    parametric: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    showLabelsX: false,
    showLabelsY: false,
    perfOutput: false,
  };

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    const attrs = ['yAxesAt', 'perfOutput', 'xScale', 'yScale', 'showLabelsX', 'showLabelsY',
      'yScale', 'indexes', 'data', 'divStyle', 'parametric', 'current'];

    const { shouldRender, linesObject } = shouldRenderComponent(
      attrs,
      nextProps,
      this.linesObject,
      this.props
    );
    this.linesObject = linesObject;
    return shouldRender;
  }

  componentDidUpdate() {
    this.draw();
  }

  draw = () => {
    const {
      perfOutput,
      lines,
      updateLabelPosition,
      showLabelsX,
      showLabelsY,
      yScale,
      xScale,
      data,
      indexes,
      current,
      parametric,
      divStyle,
    } = this.props;

    const ctx = this.el.getContext('2d');

    drawLinesCanvas(
      perfOutput,
      lines,
      updateLabelPosition,
      showLabelsX,
      showLabelsY,
      yScale,
      xScale,
      data,
      indexes,
      current,
      parametric,
      divStyle,
      ctx
    );
  };

  assignEl = (el) => { this.el = el; };

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
