import React, { PureComponent, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import _map from 'lodash/map';
import _split from 'lodash/split';
import _get from 'lodash/get';
import _find from 'lodash/find';
import styles from '../Explorer.css';

function perRemoteIdHeader() {
  return (<thead>
    <tr key="header">
      <th className="text-center">Parameter Name</th>
      <th className="text-center">COM Object</th>
      <th className="text-center">Session</th>
      <th className="text-center">Domain</th>
      <th className="text-center">Filters</th>
      <th className="text-center">Field</th>
      <th className="text-center">Timebar</th>
      {/* <th className="text-center">Views</th>*/}
    </tr>
  </thead>);
}

function displayedFilters(filters) {
  let display = '';
  if (!filters) {
    return display;
  }

  filters.forEach((filter) => {
    if (display !== '') {
      display = display.concat('\n');
    }
    display = display.concat(filter.field)
                     .concat(' ')
                     .concat(filter.operator)
                     .concat(' ')
                     .concat(filter.operand);
  });
  return display;
}

export default class PerRemoteId extends PureComponent {
  static propTypes = {
    perRemoteId: PropTypes.object,
    timebars: PropTypes.object,
    sessions: PropTypes.array.isRequired,
    domains: PropTypes.array.isRequired,
  }

  epInfo(value, isFirst) {
    if (isFirst) {
      const { sessions, domains } = this.props;
      const sessionName = _get(_find(sessions, ['id', value.dataId.sessionId]), ['name']);
      const domainName = _get(_find(domains, ['domainId', value.dataId.domainId]), ['name']);

      const key = value.dataId.parameterName;
      return [
        <td key={key.concat(1)}>{value.dataId.parameterName}</td>,
        <td key={key.concat(2)}>{value.dataId.comObject}</td>,
        <td key={key.concat(3)}>{sessionName}</td>,
        <td key={key.concat(4)}>{domainName}</td>,
        <td key={key.concat(5)}>{displayedFilters(value.filter)}</td>,
      ];
    }
    return [<td />, <td />, <td />, <td />, <td />];
  }

  perRemoteIdLines() {
    const { perRemoteId, timebars } = this.props;
    let index = 1;
    return _map(perRemoteId, (value) => {
      let isFirst = true;
      return _map(value.localIds, (localId, localKey) => {
        const fields = _split(localKey, '.');
        const line = (<tr key={'remoteId'.concat(index)}>
          {this.epInfo(value, isFirst)}
          {fields[0] !== 'undefined' && <td>{fields[0]}</td>}
          {fields[0] === 'undefined' && <td />}
          {localId.timebarUuid && <td>{timebars[localId.timebarUuid].id}</td>}
          {!localId.timebarUuid && <td />}
        </tr>);
        isFirst = false;
        index += 1;
        return line;
      });
    });
  }


  render() {
    return (<div className={styles.content}>
      <Table striped bordered condensed hover className={styles.table}>
        {perRemoteIdHeader()}
        <tbody>
          {this.perRemoteIdLines()}
        </tbody>
      </Table>
    </div>);
  }
}
