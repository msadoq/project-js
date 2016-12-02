import React from 'react';
import {
   formatDate,
   fixDecimals,
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
    this.socket.on('latency', (d) => {
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
              this.convertData(d)
            ]
          }
        }
      });
    });
  }

  render() {
    return (
      <div style={{clear:'both'}}>
        <h2>Loop latency</h2>
        {Object.keys(this.state.processes).map((p,i) => (
          <LoopLatencyChart key={i} process={this.state.processes[p]} />
        ))}
      </div>
    );
  }
}
