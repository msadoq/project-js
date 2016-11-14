import moment from 'moment';
import React, { PureComponent } from 'react';
import styles from './TimebarScale.css';

const levelsRules = getLevelsRules();

export default class TimebarScale extends PureComponent {
  static propTypes = {
    slideLower: React.PropTypes.number.isRequired,
    slideUpper: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  onMouseUp = () => {
    this.navigate(true);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { slideLower, slideUpper } = this.props;
    const dragOrigin = e.pageX;
    this.setState({
      slideLower,
      slideUpper,
      dragOrigin
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (e) => {
    const { dragOrigin, navigating } = this.state;
    const mult = e.pageX > dragOrigin ? -1 : 1;
    const abs = Math.abs(e.pageX - dragOrigin);
    let pow = 2;
    if (abs > 140) {
      pow = 9;
    } else if (abs > 100) {
      pow = 7;
    } else if (abs > 50) {
      pow = 6;
    } else if (abs > 40) {
      pow = 5;
    } else if (abs > 30) {
      pow = 4;
    } else if (abs > 20) {
      pow = 3;
    }
    const offsetRel = (mult * 20) / Math.pow(abs / 100, pow);
    this.setState({
      navigationOffset: offsetRel,
    });

    if (!navigating) {
      this.setState({ navigating: true });
      setTimeout(this.navigate, 60);
    }
  }

  getRules(viewportMs, zl) {
    const { slideLower, slideUpper } = this.props;
    const start = moment(slideLower);
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
        (100 * (ts - slideLower)) / (slideUpper - slideLower)
      ]);
    }
    return output;
  }

  navigate = (stop = false) => {
    const { navigating, navigationOffset } = this.state;
    const { slideLower, slideUpper, onChange } = this.props;
    const viewportMsWidth = slideUpper - slideLower;
    const offsetMs = viewportMsWidth / navigationOffset;
    onChange(
      slideLower + offsetMs,
      slideUpper + offsetMs,
      stop
    );
    if (navigating) {
      if (stop) {
        this.setState({ navigating: false });
      } else {
        setTimeout(this.navigate, 60);
      }
    }
  }

  render() {
    const viewportMs = this.props.slideUpper - this.props.slideLower;
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
