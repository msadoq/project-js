import React, { PureComponent, PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import _forEach from 'lodash/forEach';
import _split from 'lodash/split';
import _join from 'lodash/join';
import _slice from 'lodash/slice';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _find from 'lodash/find';

import styles from '../Explorer.css';

function perViewHeader() {
  return (<thead>
    <tr key="header">
      <th className="text-center">View Title</th>
      <th className="text-center">EntryPoint names</th>
      <th className="text-center">Parameter Name</th>
      <th className="text-center">Field</th>
      <th className="text-center">COM Object</th>
      <th className="text-center">Catalog</th>
      <th className="text-center">Session</th>
      <th className="text-center">Domain</th>
      <th className="text-center">Filters</th>
    </tr>
  </thead>);
}

export default class PerView extends PureComponent {
  static propTypes = {
    perView: PropTypes.object,
    parseFormula: PropTypes.func,
    views: PropTypes.object,
    sessions: PropTypes.array.isRequired,
    domains: PropTypes.array.isRequired,
  }

  perViewLine() {
    const { perView, views } = this.props;
    return _map(perView, (value, id) => {
      const viewTitle = views[id].configuration.title;
      const viewType = views[id].type;
      return this.epPerView(value.entryPoints, id, viewTitle, viewType);
    });
  }

  epPerView(entryPoints, viewId, viewTitle, viewType) {
    const { parseFormula, sessions, domains } = this.props;

    const index = 'perView'.concat(viewId);
    const epTable = [];
    let isFirst = true;
    _forEach(entryPoints, (ep, epName) => {
      const name = (viewType === 'DynamicView' ? '-' : epName);
      // EP in error
      if (ep.error) {
        epTable.push((
          <tr key={index.concat(epName)}>
            <td>{isFirst ? viewTitle : ''}</td>
            <td>{name}</td>
            <td colSpan={7}>{ep.error}</td>
          </tr>
        ));
        isFirst = false;
        return;
      }

      // EP on view
      const remoteId = _split(ep.remoteId, '@')[1]; // remoteId without last or range
      const formulas = _split(remoteId, ':');
      const { catalog, parameterName, comObject, field }
        = parseFormula(formulas[0].concat('.').concat(ep.field ? ep.field : ep.fieldY));
      let displayedField = field;
      if (ep.fieldX) {
        displayedField = displayedField.concat('\n').concat(ep.fieldX);
      }
      // Filters
      let filters = '-';
      if (formulas.length > 3) {
        const f = _split(formulas[3], ',');
        filters = '';
        f.forEach((filter) => {
          const elems = _split(filter, '.');
          let operand = elems[2];
          if (elems.length > 3) {
            operand = _join(_slice(elems, 2), '.');
          }
          const current = elems[0].concat(' ').concat(elems[1]).concat(' ').concat(operand);
          if (filters !== '') {
            filters = filters.concat('\n');
          }
          filters = filters.concat(current);
        });
      }
      const sessionName = _get(_find(sessions, ['id', Number(formulas[1])]), ['name']);
      const domainName = _get(_find(domains, ['domainId', Number(formulas[2])]), ['name']);

      epTable.push((
        <tr key={index.concat(epName)}>
          <td>{isFirst ? viewTitle : ''}</td>
          <td>{name}</td>
          <td>{parameterName}</td>
          <td>{displayedField}</td>
          <td>{comObject}</td>
          <td>{catalog}</td>
          <td>{sessionName}</td>
          <td>{domainName}</td>
          <td>{filters}</td>
        </tr>));

      isFirst = false;
    });
    return epTable;
  }

  render() {
    return (
      <div className={styles.content}>
        <Table striped bordered condensed hover className={styles.table}>
          {perViewHeader()}
          <tbody>
            {this.perViewLine()}
          </tbody>
        </Table>
      </div>);
  }
}
