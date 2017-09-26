// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Scale.css';
import { levelsRules, getZoomLevel } from '../../common/timeFormats';

// 1980-01-01
const minViewportLower = 315532800000;
// 2040-01-01
const maxViewportUpper = 2208988800000;

export default class TimebarScale extends PureComponent {

  static propTypes = {
    viewportLower: PropTypes.number.isRequired,
    viewportUpper: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onMouseUp = () => {
    setTimeout(this.autoSave, 120);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { viewportLower, viewportUpper } = this.props;
    const dragOrigin = e.pageX;
    this.setState({
      viewportLower,
      viewportUpper,
      originLower: viewportLower,
      originUpper: viewportUpper,
      dragOrigin,
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    const { viewportLower, viewportUpper, onChange } = this.props;
    const { dragOrigin, originLower, originUpper } = this.state;

    const abs = dragOrigin - e.pageX;
    const offsetMs = ((abs / this.el.clientWidth) * (viewportUpper - viewportLower));
    const newViewportLower = originLower + offsetMs;
    const newViewportUpper = originUpper + offsetMs;
    if (newViewportLower < minViewportLower || newViewportUpper > maxViewportUpper) return;
    onChange(
      newViewportLower,
      newViewportUpper,
      false
    );

    this.setState({
      viewportLower: newViewportLower,
      viewportUpper: newViewportUpper,
    });
  }

  getRules(viewportMs, levelRule) {
    const start = moment(this.props.viewportLower);
    const output = [];

    // security left margin (rule is begginning a few steps before viewport.lower)
    start.subtract(levelRule.add[0] * 3, levelRule.add[1]).startOf(levelRule.startOf);
    for (let i = 0; i < 50; i += 1) {
      const ts = start.add(levelRule.add[0], levelRule.add[1]).toDate().getTime();
      output.push({
        ms: ts,
        formatted: start.format(levelRule.format),
      });
    }

    return output;
  }

  autoSave = () => {
    const { viewportLower, viewportUpper } = this.state;
    const { onChange } = this.props;
    onChange(
      viewportLower,
      viewportUpper,
      true
    );
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const viewportMs = this.props.viewportUpper - this.props.viewportLower;
    const zoomLevel = getZoomLevel(viewportMs);
    const start = moment(this.props.viewportLower);
    const levelRule = levelsRules[zoomLevel];

    // security left margin (rule is begginning a few steps before viewport.lower)
    start.subtract(levelRule.add[0] * 3, levelRule.add[1]).startOf(levelRule.startOf);

    const scales = this.getRules(viewportMs, levelRule);

    // First scale defines the offset left of the containing dif
    const startMs = scales[0].ms;
    const startPercent = (100 * (startMs - this.props.viewportLower)) /
      (this.props.viewportUpper - this.props.viewportLower);

    // Offset between each scale
    const percentBetweenScales = (100 *
      moment.duration(levelRule.add[0], levelRule.add[1]).asMilliseconds()) /
      (this.props.viewportUpper - this.props.viewportLower);

    return (
      <div
        className={classnames('Scale', styles.timebarRuleContainer)}
        onMouseDown={this.onMouseDown}
      >
        <div
          className={styles.timebarRule}
          ref={this.assignEl}
          style={{ left: `${startPercent}%` }}
        >
          {
            scales.map((s, i) =>
              <div
                key={s.ms}
                className={styles.scaleBar}
                style={{ left: `${percentBetweenScales * i}%` }}
              >
                <span className={classnames('ScaleTime', styles.scaleTime)}>{s.formatted}</span>
                <span className={styles.scaleBar} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
