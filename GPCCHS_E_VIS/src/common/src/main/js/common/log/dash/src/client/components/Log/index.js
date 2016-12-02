import React from 'react';

import Logs from './Logs';

export default class LogsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    this.socket.on('log', (data) => {
      const logs = [
        data,
        ...this.state.logs.slice(0, 49),
      ];
      this.setState({
        logs
      });
    });
  }

  clearLogs() {
    this.setState({
      logs: []
    });
  }

  render() {
    return <div style={{clear:'both'}}>
      <h2>Logs ({this.state.logs.length})</h2>
      <button onClick={this.clearLogs.bind(this)}>Clear</button>
      <Logs logs={this.state.logs} />
    </div>;
  }
}
