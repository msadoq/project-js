import moment from 'moment';
import React, { Component } from 'react';
import styles from './TimebarScale.css';


export default class TimebarScale extends Component {
  static propTypes = {
    timeBeginning: React.PropTypes.number.isRequired,
    timeEnd: React.PropTypes.number.isRequired,
  }

  levelsRules() {
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const min = 1000 * 60;
    const sec = 1000;
    return [
      {
        duration: day * 365,
        startOf: 'year',
        add: [2, 'month'],
        format: 'DD[/]MM[/]YYYY'
      },
      {
        duration: day * 120,
        startOf: 'year',
        add: [1, 'month'],
        format: 'DD[/]MM[/]YYYY'
      },
      {
        duration: day * 60,
        startOf: 'month',
        add: [15, 'day'],
        format: 'DD[/]MM[/]YYYY HH[h]mm'
      },
      {
        duration: day * 30,
        startOf: 'month',
        add: [8, 'day'],
        format: 'DD[/]MM[/]YYYY HH[h]mm'
      },
      {
        duration: day * 15,
        startOf: 'month',
        add: [4, 'day'],
        format: 'DD[/]MM[/]YYYY HH[h]mm'
      },
      // level 5
      {
        duration: day * 7,
        startOf: 'month',
        add: [2, 'day'],
        format: 'DD[/]MM[/]YYYY HH[h]mm'
      },
      {
        duration: day * 3,
        startOf: 'day',
        add: [12, 'hour'],
        format: 'DD[/]MM HH[h]mm'
      },
      {
        duration: day,
        startOf: 'day',
        add: [6, 'hour'],
        format: 'DD[/]MM HH[h]mm'
      },
      {
        duration: 12 * hour,
        startOf: 'day',
        add: [2, 'hour'],
        format: 'DD[/]MM HH[h]mm'
      },
      {
        duration: 6 * hour,
        startOf: 'hour',
        add: [30, 'minute'],
        format: 'HH[h]mm'
      },
      // level 10
      {
        duration: 2 * hour,
        startOf: 'hour',
        add: [15, 'minute'],
        format: 'HH[h]mm'
      },
      {
        duration: min * 40,
        startOf: 'hour',
        add: [5, 'minute'],
        format: 'HH[h]mm'
      },
      {
        duration: min * 20,
        startOf: 'hour',
        add: [2, 'minute'],
        format: 'HH[h]mm'
      },
      {
        duration: min * 10,
        startOf: 'minute',
        add: [1, 'minute'],
        format: 'HH[h]mm'
      },
      {
        duration: min * 5,
        startOf: 'minute',
        add: [30, 'second'],
        format: 'HH[h]mm[:]ss'
      },
      // level 15
      {
        duration: min * 2,
        startOf: 'minute',
        add: [20, 'second'],
        format: 'HH[h]mm[:]ss'
      },
      {
        duration: min,
        startOf: 'minute',
        add: [10, 'second'],
        format: 'HH[h]mm[:]ss'
      },
      {
        duration: sec * 30,
        startOf: 'minute',
        add: [5, 'second'],
        format: 'mm[m] ss[s]'
      },
      {
        duration: sec * 10,
        startOf: 'minute',
        add: [2, 'second'],
        format: 'mm[m] ss[s]'
      },
      {
        duration: sec * 5,
        startOf: 'second',
        add: [1, 'second'],
        format: 'mm[m] ss[s]'
      },
      // level 20
      {
        duration: sec * 2,
        startOf: 'second',
        add: [500, 'ms'],
        format: 'ss[s] SSS[ms]'
      },
      {
        duration: sec,
        startOf: 'second',
        add: [200, 'ms'],
        format: 'ss[s] SSS[ms]'
      },
      {
        duration: sec / 2,
        startOf: 'second',
        add: [100, 'ms'],
        format: 'ss[s] SSS[ms]'
      },
      {
        duration: sec / 4,
        startOf: 'second',
        add: [50, 'ms'],
        format: 'ss[s] SSS[ms]'
      }
    ];
  }

  getRules(viewportMs, zl) {
    const { timeBeginning, timeEnd } = this.props;
    const start = moment(timeBeginning);
    const output = [];
    const levelRule = this.levelsRules()[zl];

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
        (100 * (ts - timeBeginning)) / (timeEnd - timeBeginning)
      ]);
    }
    return output;
  }

  zoomLevel(viewportMs) {
    const zoomLevels = this.levelsRules().map(d => d.duration);
    let zoomLevel = zoomLevels.findIndex(v => viewportMs >= v);
    if (zoomLevel === -1) zoomLevel = zoomLevels.length - 1;

    return zoomLevel;
  }

  render() {
    const viewportMs = this.props.timeEnd - this.props.timeBeginning;
    const scales = this.getRules(viewportMs, this.zoomLevel(viewportMs));
    const scaleElements = scales.map((s, i) =>
      React.createElement('div', { key: i, className: styles.scaleBar, style: { left: `${s[2]}%` } },
        React.createElement('span', { className: styles.scaleTime }, s[1]),
        React.createElement('span', { className: styles.scaleBar })
      )
    );

    return (
      <div className={styles.timebarRule}>
        { scaleElements }
      </div>
    );
  }
}
