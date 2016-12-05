import React from 'react';
import {
   formatDate,
   fixDecimals,
   RxfromIO,
} from '../../util';
import LoopLatencyChart from './Chart';

export default class LoopLatencyContainer extends React.Component {
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
      min: fixDecimals(d.min, 2),
      max: fixDecimals(d.max, 2),
      avg: fixDecimals(d.avg, 2),
    };
  }

  componentDidMount() {
    const ws$ = RxfromIO(this.socket, 'latency')
      .scan((processes, data) => ({
          ...processes,
          [data.pid]: {
            ...processes[data.pid],
            pname: data.pname,
            pid: data.pid,
            data: [
              ...((processes[data.pid] || {}).data) || [],
              this.convertData(data)
            ],
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
          <h2>Loop latency</h2>
          {Object.keys(processes).map((p,i) => (
            <LoopLatencyChart key={i} process={processes[p]} />
          ))}
        </div>
      );
    }
    return null;
  }
}
