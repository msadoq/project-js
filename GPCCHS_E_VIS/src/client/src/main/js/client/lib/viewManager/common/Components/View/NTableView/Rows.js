/* eslint-disable no-unused-vars,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './Rows.scss';

const Rows = ({ rows }) =>
  rows.map(
    row =>
      (
        <tr key={shortid.generate()}>
          {row.map(col => <td key={shortid.generate()}> {col} </td>)}
        </tr>
      )
  );


Rows.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.any),
};

Rows.defaultProps = {
  rows: [],
};

export default Rows;
