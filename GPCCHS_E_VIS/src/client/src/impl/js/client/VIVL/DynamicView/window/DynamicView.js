import React, { PropTypes, PureComponent } from 'react';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _lowerCase from 'lodash/lowerCase';
import moment from 'moment';
import styles from './DynamicView.css';

function dataToShow(data) {
  if (data.value === undefined) {
    return;
  }
  if (data.type === 'time') {
    return moment(data.value).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS');
  } else if (data.type === 'boolean') {
    return data.value ? 'true' : 'false';
  } else if (data.type === 'enum') {
    return data.symbol;
  }
  return data.value;
}

function objectHeader(ep) {
  const objectKeys = Object.keys(ep).filter(key => !_isArray(ep[key]));

  const staticHeader = [];
  objectKeys.forEach((key, idx) => {
    staticHeader.push(
      <li key={idx} className={styles.obj}>{_lowerCase(key)}: {dataToShow(ep[key])}</li>);
  });

  return staticHeader;
}

function arrayHeader(arrayData) {
  if (!arrayData.length) {
    return <tr />;
  }
  const header = Object.keys(arrayData[0]).map(value =>
    <th className={styles.thd}>{_lowerCase(value)}</th>);
  return (<tr key="header" className={styles.th}>{header}</tr>);
}

function arrayLine(arrayData) {
  if (!arrayData.length) {
    return;
  }
  const header = Object.keys(arrayData[0]);
  return arrayData.map((value, idx) =>
    (<tr key={idx}>{header.map(key => <td className={styles.td}>
      {dataToShow(value[key])}</td>)}</tr>));
}

export default class DynamicView extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
  };
  render() {
    const ep = _get(this.props, ['data', 'values', 'dynamicEP', 'value']);
    if (!ep) {
      return (<div>No data</div>);
    }

    return (
      <div>
        <ul>
          {objectHeader(ep)}
          <table className={styles.table}>
            <tbody>
              {arrayHeader(ep.decommutedValues)}
              {arrayLine(ep.decommutedValues)}
            </tbody>
          </table>
        </ul>
      </div>
    );
  }
}
