/* eslint-disable no-unused-vars,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import cn from 'classnames';


import './Rows.scss';

/**
 * Get the ordered list of the parameters to display
 *
 * @param columns
 * @returns {*|*[]}
 */
const getColumns = (columns = []) =>
  columns.reduce((acc, group) => {
    const groupParams =
      group[1]
        .filter(param => param.isDisplayed)
        .map(param => param.field);

    return [
      ...acc,
      ...groupParams,
    ];
  }, []);

const getColumnIndex = (colKey, columns) => columns.indexOf(colKey);

const getTimeFromRowValue = rowValue => (new Date(rowValue)).getTime();

const Rows = (
  {
    rows,
    config,
    current,
    rowCount,
  }
) => {
  const columns = getColumns(config.columns);
  const offset = config.dataOffset;

  const scopedRows = rows.slice(offset, offset + rowCount);

  return scopedRows.map(
    (row) => {
      const searchQuery = config.search;
      const epNameColIndex = getColumnIndex('epName', columns);
      const timestampColIndex = getColumnIndex('referenceTimestamp', columns);

      const rowMacthesCurrent = cur =>
        cur.epName === row[epNameColIndex] &&
        Number(cur.timestamp) === getTimeFromRowValue(row[timestampColIndex]);

      const isCurrent =
        current.some(c => rowMacthesCurrent(c));

      const valueMatchesQuery = (value, query) =>
        searchQuery &&
        `${searchQuery}`.length > 0 &&
        `${value}`.toLowerCase().indexOf(`${searchQuery}`.toLowerCase()) > -1;

      const shouldRowBeHighlighted =
        row.some(col => valueMatchesQuery(col, searchQuery));

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
  rowCount: PropTypes.number,
};

Rows.defaultProps = {
  rows: [],
  current: [],
  rowCount: 0,
};

export default Rows;
