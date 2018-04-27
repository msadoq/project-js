import React from 'react';
import PropTypes from 'prop-types';

import './ColumnSearchHeaders.scss';


const ColumnSearchHeaders = ({ cols, filterState, onSearch }) => (
  <tr className={'ColumnSearchHeaders'}>
    {
      Object.keys(cols)
        .map(
          colKey =>
            <th
              className={'ColumnSearchHeaders--header'}
              key={`${colKey}$search`}
            >
              <input
                type={'text'}
                value={filterState[colKey]}
                onChange={ev => onSearch(colKey, ev.target.value)}
              />
            </th>
        )
    }
  </tr>
);

ColumnSearchHeaders.propTypes = {
  cols: PropTypes.shape(),
  filterState: PropTypes.shape(),
  onSearch: PropTypes.func.isRequired,
};

ColumnSearchHeaders.defaultProps = {
  cols: {},
  filterState: {},
};

export default ColumnSearchHeaders;
