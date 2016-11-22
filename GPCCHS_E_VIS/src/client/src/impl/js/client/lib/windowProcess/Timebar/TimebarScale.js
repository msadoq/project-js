import moment from 'moment';
import React, { PureComponent } from 'react';
import styles from './TimebarScale.css';

const levelsRules = getLevelsRules();
// 1980-01-01
const minViewportLower = 315532800000;
// 2040-01-01
const maxViewportUpper = 2208988800000;

export default class TimebarScale extends PureComponent {
  static propTypes = {
    viewportLower: React.PropTypes.number.isRequired,
    viewportUpper: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
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
      dragOrigin
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    const { viewportLower, viewportUpper, onChange } = this.props;
    const { dragOrigin, originLower, originUpper } = this.state;

    const abs = e.pageX - dragOrigin;
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

  getRules(viewportMs, zl) {
    const { viewportLower, viewportUpper } = this.props;
    const start = moment(viewportLower);
    const output = [];
    const levelRule = levelsRules[zl];

    start.subtract(levelRule.add[0] * 3, levelRule.add[1]).startOf(levelRule.startOf);
    for (let i = 0; i < 50; i += 1) {
      let ts;
      if (zl > 19) {
        ts = start.add(levelRule.add[0], levelRule.add[1]).toDate().getTime() + levelRule.add[0];
      } else {
        ts = start.add(levelRule.add[0], levelRule.add[1]).unix() * 1000;
      }

      output.push([
        ts,
        start.format(levelRule.format),
        (100 * (ts - viewportLower)) / (viewportUpper - viewportLower)
      ]);
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

  render() {
    const viewportMs = this.props.viewportUpper - this.props.viewportLower;
    const scales = this.getRules(viewportMs, getZoomLevel(viewportMs));

    return (
      <div
        className={styles.timebarRule}
        onMouseDown={this.onMouseDown}
        ref={(el) => { this.el = el; }}
      >
        {
          scales.map((s, i) =>
            <div key={i} className={styles.scaleBar} style={{ left: `${s[2]}%` }}>
              <span className={styles.scaleTime}>{s[1]}</span>
              <span className={styles.scaleBar} />
            </div>
          )
        }
      </div>
    );
  }
}

function getZoomLevel(viewportMs) {
  const zoomLevels = levelsRules.map(d => d.duration);
  let zoomLevel = zoomLevels.findIndex(v => viewportMs >= v);
  if (zoomLevel === -1) zoomLevel = zoomLevels.length - 1;

  return zoomLevel;
}

function getLevelsRules() {
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const min = 1000 * 60;
  const sec = 1000;
  return [
    {
      duration: day * 365 * 10,
      startOf: 'year',
      add: [1, 'year'],
      format: 'YYYY'
    },
    {
      duration: day * 365 * 2,
      startOf: 'year',
      add: [6, 'months'],
      format: 'YYYY[-]MM'
    },
    {
      duration: day * 365,
      startOf: 'year',
      add: [2, 'month'],
      format: 'YYYY[-]MM[-]DD'
    },
    {
      duration: day * 120,
      startOf: 'year',
      add: [1, 'month'],
      format: 'YYYY[-]MM[-]DD'
    },
    {
      duration: day * 60,
      startOf: 'month',
      add: [15, 'day'],
      format: 'YYYY[-]MM[-]DD HH[:]mm'
    },
    {
      duration: day * 30,
      startOf: 'month',
      add: [8, 'day'],
      format: 'YYYY[-]MM[-]DD HH[:]mm'
    },
    {
      duration: day * 15,
      startOf: 'month',
      add: [4, 'day'],
      format: 'YYYY[-]MM[-]DD HH[:]mm'
    },
    // level 5
    {
      duration: day * 7,
      startOf: 'month',
      add: [2, 'day'],
      format: 'YYYY[-]MM[-]DD HH[:]mm'
    },
    {
      duration: day * 3,
      startOf: 'day',
      add: [12, 'hour'],
      format: 'MM[-]DD HH[:]mm'
    },
    {
      duration: day,
      startOf: 'day',
      add: [6, 'hour'],
      format: 'MM[-]DD HH[:]mm'
    },
    {
      duration: 12 * hour,
      startOf: 'day',
      add: [2, 'hour'],
      format: 'MM[-]DD HH[:]mm'
    },
    {
      duration: 6 * hour,
      startOf: 'hour',
      add: [30, 'minute'],
      format: 'HH[:]mm'
    },
    // level 10
    {
      duration: 2 * hour,
      startOf: 'hour',
      add: [15, 'minute'],
      format: 'HH[:]mm'
    },
    {
      duration: min * 40,
      startOf: 'hour',
      add: [5, 'minute'],
      format: 'HH[:]mm'
    },
    {
      duration: min * 20,
      startOf: 'hour',
      add: [2, 'minute'],
      format: 'HH[:]mm'
    },
    {
      duration: min * 10,
      startOf: 'minute',
      add: [1, 'minute'],
      format: 'HH[:]mm'
    },
    {
      duration: min * 5,
      startOf: 'minute',
      add: [30, 'second'],
      format: 'HH[:]mm[:]ss'
    },
    // level 15
    {
      duration: min * 2,
      startOf: 'minute',
      add: [20, 'second'],
      format: 'HH[:]mm[:]ss'
    },
    {
      duration: min,
      startOf: 'minute',
      add: [10, 'second'],
      format: 'HH[:]mm[:]ss'
    },
    {
      duration: sec * 30,
      startOf: 'minute',
      add: [5, 'second'],
      format: 'mm[:]ss'
    },
    {
      duration: sec * 10,
      startOf: 'minute',
      add: [2, 'second'],
      format: 'mm[:]ss'
    },
    {
      duration: sec * 5,
      startOf: 'second',
      add: [1, 'second'],
      format: 'mm[:]ss'
    },
    // level 20
    {
      duration: sec * 2,
      startOf: 'second',
      add: [500, 'ms'],
      format: 'mm[:]ss[.]SSS'
    },
    {
      duration: sec,
      startOf: 'second',
      add: [200, 'ms'],
      format: 'mm[:]ss[.]SSS'
    },
    {
      duration: sec / 2,
      startOf: 'second',
      add: [100, 'ms'],
      format: 'mm[:]ss[.]SSS'
    },
    {
      duration: sec / 4,
      startOf: 'second',
      add: [50, 'ms'],
      format: 'mm[:]ss[.]SSS'
    }
  ];
}
