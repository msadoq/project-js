import React, { Component, PropTypes } from 'react';
import styles from './GrizzlyChart.css';
import { drawLinesCanvas, shouldRenderComponent } from './LineCanvasCommon';
import { lineType, divStyleType } from './types';

const { shape, func, bool, arrayOf, objectOf, number } = PropTypes;

export default class LinesCanvas extends Component {

  static propTypes = {
    updateLabelPosition: func.isRequired,
    xScale: func.isRequired,
    yScale: func.isRequired,
    showLabelsX: bool,
    showLabelsY: bool,
    perfOutput: bool,
    indexes: objectOf(shape).isRequired,
    current: number.isRequired,
    lines: arrayOf(lineType.isRequired).isRequired,
    divStyle: divStyleType.isRequired,
    parametric: bool.isRequired,
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
      'yScale', 'indexes', 'divStyle', 'parametric', 'current'];

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
