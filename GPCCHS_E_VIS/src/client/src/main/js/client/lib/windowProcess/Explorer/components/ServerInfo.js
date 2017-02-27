import React, { PropTypes, PureComponent } from 'react';
import { Table, Button } from 'react-bootstrap';

import _get from 'lodash/get';
import _find from 'lodash/find';
import _map from 'lodash/map';

import { main } from '../../../windowProcess/ipc';

import styles from '../Explorer.css';

function connDataHeader() {
  return (
    <thead>
      <tr>
        <td>Parameter name</td>
        <td>COM object</td>
        <td>Catalog</td>
        <td>Session</td>
        <td>Domain</td>
      </tr>
    </thead>);
}

export default class ServerInfo extends PureComponent {
  static propTypes = {
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    domains: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    server: {},
    isLoading: false,
  }

  componentDidMount() {
    this.updateInfo();
  }

  updateInfo = () => {
    this.setState({ isLoading: true });
    main.serverDebug((debug) => {
      this.setState({ isLoading: false, server: debug });
    });
  }
  connDataLines() {
    const { connectedData } = this.state.server;
    return _map(connectedData, cd => this.connDataLine(cd));
  }

  connDataLine(connectedData) {
    const { dataId } = connectedData;
    const { sessions, domains } = this.props;
    const sessionName = _get(_find(sessions, ['id', dataId.sessionId]), ['name']);
    const domainName = _get(_find(domains, ['domainId', dataId.domainId]), ['name']);
    return (
      <tr key={dataId.parameterName}>
        <td>{dataId.parameterName}</td>
        <td>{dataId.comObject}</td>
        <td>{dataId.catalog}</td>
        <td>{sessionName}</td>
        <td>{domainName}</td>
      </tr>
    );
  }


  render() {
    const dataTable = (
      <div className={styles.content}>
        <Table striped bordered condensed hover className={styles.table}>
          {connDataHeader()}
          <tbody>
            {this.connDataLines()}
          </tbody>
        </Table>
      </div>
    );
    const isLoading = this.state.isLoading;

    return (
      <div>
        <div>
          <Button onClick={this.updateInfo}><span className="glyphicon glyphicon-refresh" />
          </Button>
        </div>
        {!isLoading && dataTable}
        {isLoading && <div>Waiting...</div>}
      </div>
    );
  }
}
