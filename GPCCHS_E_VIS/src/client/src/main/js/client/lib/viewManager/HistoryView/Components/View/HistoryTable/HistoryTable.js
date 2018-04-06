/* eslint-disable no-unused-vars,react/jsx-indent */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import './HistoryTable.scss';


const GroupHeaders = ({ groups }) => (
  <tr>
    {
      Object.keys(groups).map(groupKey =>
        <th key={groupKey} colSpan={groups[groupKey].size}>{ groupKey }</th>)
    }
  </tr>
);

GroupHeaders.propTypes = {
  groups: PropTypes.shape().isRequired,
};

const ColumnHeaders = ({ groups }) => (
  <tr>
    {
      Object.keys(groups).map(
        groupKey => Object.keys(groups[groupKey].cols).map(
          colKey => <th key={`${groupKey}$${colKey}`}> { colKey } </th>
        )
      )
    }
  </tr>
);

ColumnHeaders.propTypes = {
  groups: PropTypes.shape().isRequired,
};

const Rows = ({ groups, length }) =>
  Array(length).fill(0).map((_, rowIndex) => (
      <tr key={`row$${rowIndex}`}>
        {
          Object.keys(groups).map(
            groupKey =>
              Object.keys(groups[groupKey].cols).map(colKey =>
                <td key={`${groupKey}$${colKey}$${rowIndex}`}>
                  {
                    groups[groupKey].cols[colKey][rowIndex]
                  }
                </td>
              )
          )
        }
      </tr>
    )
  );

Rows.propTypes = {
  length: PropTypes.number.isRequired,
  groups: PropTypes.shape().isRequired,
};

const HistoryTable = ({ data, actions }) => (
  <table className={'HistoryTable'}>
    <thead>
    <GroupHeaders groups={data.groups} />
    <ColumnHeaders groups={data.groups} />
    </thead>
    <tbody>
    <Rows length={data.length} groups={data.groups} />
    </tbody>
  </table>
);

HistoryTable.propTypes = {
  data: PropTypes.shape(),
  actions: PropTypes.shape(),
};

HistoryTable.defaultProps = {
  data: {},
  actions: {},
};

export default HistoryTable;
