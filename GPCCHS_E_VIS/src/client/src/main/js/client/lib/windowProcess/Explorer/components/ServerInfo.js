import React, { PropTypes, PureComponent } from 'react';
import { Table } from 'react-bootstrap';

import _get from 'lodash/get';
import _find from 'lodash/find';
import _map from 'lodash/map';

function connDataHead() {
  return (
    <tr>
      <td>Parameter name</td>
      <td>COM object</td>
      <td>Catalog</td>
      <td>Session</td>
      <td>Domain</td>
    </tr>
  );
}


export default class ServerInfo extends PureComponent {
  static propTypes = {
    server: PropTypes.object.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    domains: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  connDataLine(connectedData) {
    const { dataId } = connectedData;
    const { sessions, domains } = this.props;
    const sessionName = _get(_find(sessions, ['id', dataId.sessionId]), ['name']);
    const domainName = _get(_find(domains, ['domainId', dataId.domainId]), ['name']);
    return (
      <tr>
        <td>{dataId.parameterName}</td>
        <td>{dataId.comObject}</td>
        <td>{dataId.catalog}</td>
        <td>{sessionName}</td>
        <td>{domainName}</td>
      </tr>
    );
  }

  connDataLines() {
    const { server } = this.props;
    const { connectedData } = server;

    return _map(connectedData, cd => this.connDataLine(cd));
  }

  render() {
    return (
      <Table>
        <thead>
          {connDataHead()}
        </thead>
        <tbody>
          {this.connDataLines()}
        </tbody>
      </Table>
    );
  }
}
