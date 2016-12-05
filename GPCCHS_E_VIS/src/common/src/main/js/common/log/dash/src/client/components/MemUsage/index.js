import React from 'react';
import {
   formatDate,
   bytesToMB,
   RxfromIO,
} from '../../util';
import MemUsageChart from './Chart';

export default class MemUsageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;

    this.state = {
      processes: {},
    };
  }

  convertData(d) {
    return {
      time: formatDate(d.time),
      rss: bytesToMB(d.rss),
      heapTotal: bytesToMB(d.heapTotal),
      heapUsed: bytesToMB(d.heapUsed),
    };
  }

  componentDidMount() {
    const ws$ = RxfromIO(this.socket, 'memUsage')
      .scan((processes, data) => ({
          ...processes,
          [data.pid]: {
            ...processes[data.pid],
            pname: data.pname,
            pid: data.pid,
            data: [
              ...((processes[data.pid] || {}).data) || [],
              this.convertData(data)
            ]
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
    const processes = this.state.processes;

    if (Object.keys(processes).length) {
      return (
        <div style={{clear:'both'}}>
            <div>
              <h2>Memory Usage</h2>
              {Object.keys(this.state.processes).map((p,i) => (
                <MemUsageChart key={i} process={this.state.processes[p]} />
              ))}
            </div>
        </div>
      );
    }

    return null;
  }
}
