import React from 'react';
import {
   formatDate,
   bytesToMB,
   fixDecimals
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

  componentDidMount() {
    this.socket.on('profiling', (d) => {
      const processes = this.state.processes;

      this.setState({
        processes: {
          ...processes,
          [d.pid]: {
            ...processes[d.pid],
            pname: d.pname,
            pid: d.pid,
            data: [
              ...((processes[d.pid] || {}).data) || [],
              {
                ...this.convertData(d.timers),
                time: formatDate(d.time),
              },
            ]
          }
        }
      });
    });
  }

  render() {
    return (
      <div style={{clear:'both'}}>
        <h2>Profiling</h2>
        {Object.keys(this.state.processes).map((p,i) => (
          <div>
            <h3>{this.state.processes[p].pname} PID={this.state.processes[p].pid}</h3>
            <Dashboard key={`dash-${i}`} process={this.state.processes[p]} />
            <ProfilingChart key={`chart-${i}`} process={this.state.processes[p]} />
          </div>
        ))}
      </div>
    );
  }
}
