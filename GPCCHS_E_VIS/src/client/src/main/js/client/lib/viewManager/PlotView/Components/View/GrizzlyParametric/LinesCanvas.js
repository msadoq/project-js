// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 30/06/2017 : Grizzly parametric first draft 1.0
// VERSION : 1.1.2 : DM : #6829 : 03/07/2017 : Grizzly Parametric, second draft, X axes top/bottom, Y axes right/left. 1.1
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6830 : 24/07/2017 : Reproducing styles memoization for Grizzly Parametric.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6835 : 06/09/2017 : Restored perfOutput for grizzly parametric .
// VERSION : 1.1.2 : DM : #6835 : 08/09/2017 : Simplified style for canvas divs and tooltip divs, calculated only once in main Chart component.
// VERSION : 1.1.2 : DM : #6835 : 14/09/2017 : Added support for alsso functionnality in both Grizzly and GrizzlyParametric. Fixed few bugs. Added a fake PlotViewParametricFake file to test GrizzlyParametric.
// VERSION : 1.1.2 : FA : #7755 : 18/09/2017 : When pointStyle, lineStyle or other property is changed on EP, curves get updated automatically.
// VERSION : 1.1.2 : FA : #7814 : 19/09/2017 : GrizzlyParametric now also works with indexes and data.
// END-HISTORY
// ====================================================================

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
