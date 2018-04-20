/* eslint-disable react/jsx-indent */


import React from 'react';
import PropTypes from 'prop-types';

import GroupHeaders from './GroupHeaders';
import ColumnHeaders from './ColumnHeaders';
import ColumnSearchHeaders from './ColumnSearchHeaders';
import Rows from './Rows';

import './NTableView.scss';

const computeOffset = (currentOffset, length, ev) => {
  const delta = ev.deltaY;
  const offset = Math.sign(delta) * Math.max(1, Math.floor(delta / 60));
  const newOffset = currentOffset + offset;

  if (newOffset < 0) {
    return 0;
  }

  if (newOffset > length - 1) {
    return length - 1;
  }

  return newOffset;
};

const NTableView = (
  {
    config,
    data,
    onSort,
    onFilter,
    onScroll,
  }
) => (
  <table
    className={'NTableView'}
    onWheel={ev => onScroll(computeOffset(config.dataOffset, data.length, ev))}
  >
    <thead>
    <GroupHeaders groups={data.groups} />
    <ColumnHeaders
      cols={data.cols}
      sortState={config.sorting}
      onSort={onSort}
    />
    <ColumnSearchHeaders
      cols={data.cols}
      filterState={data.filterState}
      onSearch={onFilter}
    />
    </thead>
    <tbody>
    <Rows
      rows={data.data}
      config={config}
      current={data.current}
    />
    </tbody>
  </table>
);

NTableView.propTypes = {
  config: PropTypes.shape({
    sorting: PropTypes.shape(),
    dataOffset: PropTypes.number,
    maxDisplayedRows: PropTypes.number,
    search: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    groups: PropTypes.shape(),
    cols: PropTypes.shape(),
  }),
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
};

NTableView.defaultProps = {
  data: {
    data: [],
    groups: {},
    cols: [],
  },
  current: [],
  filterState: {},
  sortState: {},
};

export default NTableView;
