import React from 'react';
import {
   formatDate,
   bytesToMB,
   fixDecimals,
   lastValues,
   RxfromIO,
} from '../../util';
import ProfilingChart from './Chart';
import Dashboard from './Dashboard';

export default class ProfilingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;

    this.state = {
      processes: {},
    };
  }

  getMaxValue(timers) {
    return timers.reduce((acc, t) => t.duration > acc ? t.duration : acc, 0);
  }

  convertData(d) {
    const timers = d.map(t => ({
      name: t.name,
      duration: fixDecimals(t.duration, 2),
      msg: t.message,
    }));

    const max = this.getMaxValue(timers);

    return timers.reduce((acc, t) => {
      if (t.duration > (max / 50)) {
        acc[t.name] = t.duration;
      }
      return acc;
    }, {});
  }

  appendData(processes, data) {
    return [
      ...lastValues(((processes[data.pid] || {}).data) || [], 5),
      {
        ...this.convertData(data.timers),
        time: formatDate(data.time),
      },
    ];
  }

  componentDidMount() {
    const ws$ = RxfromIO(this.socket, 'profiling')
      .scan((processes, data) => ({
          ...processes,
          [data.pid]: {
            ...processes[data.pid],
            pname: data.pname,
            pid: data.pid,
            data: this.appendData(processes, data)
          }
        }), {})
      .throttle(2000);

    ws$.subscribe((processes) => {
      this.setState({
        processes,
      });
    });
  }

  render() {
    let processes = this.state.processes;

    if (Object.keys(processes).length) {
      return (
        <div style={{clear:'both'}}>
          <h2>Profiling</h2>
          {Object.keys(this.state.processes).map((p,i) => (
            <div>
              <h3 key={`t=${i}`}>{this.state.processes[p].pname} PID={this.state.processes[p].pid}</h3>
              <Dashboard key={`dash-${i}`} process={this.state.processes[p]} />
              <ProfilingChart key={`chart-${i}`} process={this.state.processes[p]} />
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
}
