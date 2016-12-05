import React from 'react';
import {
   RxfromIO,
} from '../../util';

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
    const ws$ = RxfromIO(this.socket, 'log')
      .scan((acc, log) => ([
        log,
        ...acc.slice(0,49),
      ]), [])
      .throttle(2000);

    ws$.subscribe((logs) => this.setState({
        logs,
      })
    );
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
