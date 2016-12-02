import React from 'react';
import {
   formatDate,
   bytesToMB,
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
    this.socket.on('memUsage', (d) => {
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
      <div>
        <h2>Memory Usage</h2>
        {Object.keys(this.state.processes).map((p,i) => (
          <MemUsageChart key={i} process={this.state.processes[p]} />
        ))}
      </div>
    );
  }
}
