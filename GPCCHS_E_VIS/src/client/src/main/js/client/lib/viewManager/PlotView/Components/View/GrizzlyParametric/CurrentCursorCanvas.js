// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 30/06/2017 : Grizzly parametric first draft 1.0
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// VERSION : 2.0.0 : DM : #6835 : 09/10/2017 : PlotView always renders GrizzlyParametric with one x
//  axis. Tooltip reviewed. Current cursor reviewed for parametric and basic.
// VERSION : 2.0.0 : DM : #6818 : 16/11/2017 : cleanup PropTypes declaration / tests / debounce
//  linesListener action on zoom & pan
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './GrizzlyChart.css';
import { divStyleType } from './types';

const { func, number } = PropTypes;

export default class CurrentCursorCanvas extends PureComponent {
  static propTypes = {
    divStyle: divStyleType.isRequired,
    current: number.isRequired,
    xScale: func.isRequired,
  };

  componentDidMount() {
    const {
      current,
      xScale,
      divStyle,
    } = this.props;
    const ctx = this.el.getContext('2d');
    draw(ctx, current, xScale, divStyle);
  }

  componentDidUpdate() {
    const {
      current,
      xScale,
      divStyle,
    } = this.props;
    const ctx = this.el.getContext('2d');
    draw(ctx, current, xScale, divStyle);
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

/**
 * @param ctx
 * @param current
 * @param xScale
 * @param divStyle
 */
export const draw = (ctx, current, xScale, divStyle) => {
  const x = xScale(current);
  ctx.strokeStyle = '#1E2';
  ctx.fillStyle = '#1E2';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.clearRect(0, 0, divStyle.width, divStyle.height);
  ctx.moveTo(x, divStyle.height);
  ctx.lineTo(x, 0);
  ctx.stroke();
};
