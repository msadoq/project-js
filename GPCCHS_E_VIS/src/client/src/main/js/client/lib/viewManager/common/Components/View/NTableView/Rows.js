/* eslint-disable no-unused-vars,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import cn from 'classnames';


import './Rows.scss';
import { getColumns, getColumnIndex } from '../../../../HistoryView/data/formatData';

const Rows = ({ rows, config, current }) => {
  const columns = getColumns(config.columns);

  return rows.map(
    (row) => {
      const searchQuery = config.search;
      const epNameColIndex = getColumnIndex('epName', columns);
      const timestampColIndex = getColumnIndex('referenceTimestamp', columns);

      const isCurrent =
        current.some(
          c => (
            c.epName === row[epNameColIndex] &&
            Number(c.timestamp) === (new Date(row[timestampColIndex])).getTime()
          )
        );

      const shouldRowBeHighlighted =
        row.some(
          col =>
            searchQuery &&
            `${searchQuery}`.length > 0 &&
            `${col}`.toLowerCase().indexOf(`${searchQuery}`.toLowerCase()) > -1
        );

      return (
        <tr
          key={shortid.generate()}
          className={cn('Row', {
            highlighted: shouldRowBeHighlighted,
            outlined: isCurrent,
          })}
        >
          {row.map(col => <td key={shortid.generate()}> {col} </td>)}
        </tr>
      );
    }
  );
};


Rows.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any),
  config: PropTypes.shape().isRequired,
  current: PropTypes.arrayOf(PropTypes.shape({
    epName: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  })),
};

Rows.defaultProps = {
  rows: [],
  current: [],
};

export default Rows;
