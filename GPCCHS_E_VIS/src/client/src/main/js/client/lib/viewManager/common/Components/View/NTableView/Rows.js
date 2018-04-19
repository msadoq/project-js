/* eslint-disable no-unused-vars,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import cn from 'classnames';

import './Rows.scss';

const Rows = ({ rows, config }) =>
  rows.map(
    (row) => {
      const searchQuery = config.search;
      const shouldRowBeHighlighted =
        row.some(col => `${col}`.toLowerCase().indexOf(`${searchQuery}`.toLowerCase()) > -1);

      return (
        <tr
          key={shortid.generate()}
          className={cn('Row', {
            highlighted: shouldRowBeHighlighted,
          })}
        >
          {row.map(col => <td key={shortid.generate()}> {col} </td>)}
        </tr>
      );
    }
  );


Rows.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any),
  config: PropTypes.shape().isRequired,
};

Rows.defaultProps = {
  rows: [],
};

export default Rows;
