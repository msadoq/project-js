/* eslint-disable no-unused-vars,jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateColor from 'string-to-color';

import { Glyphicon } from 'react-bootstrap';

import './ColumnHeaders.scss';
import { COL_GROUP_MAP } from '../../../../HistoryView/data/formatData';


const SortArrow = ({ colKey, mode, active, onClick }) => (
  <span
    role={'presentation'}
    onClick={() => onClick(colKey, mode)}
    className={classnames({
      active,
    })}
  >
    <Glyphicon
      glyph={mode === 'DESC' ? 'chevron-down' : 'chevron-up'}
    />
  </span>
);

SortArrow.propTypes = {
  colKey: PropTypes.string.isRequired,
  mode: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

SortArrow.defaultProps = {
  mode: 'DESC',
  active: false,
  onClick: () => {
  },
};

const ColumnHeaders = ({ cols, sortState, onSort }) => (
  <tr className={'ColumnHeaders'}>
    {
      cols.map(
        colKey => (
          <th
            key={`${colKey}$col-header`}
            style={{
              backgroundColor: generateColor(COL_GROUP_MAP[colKey]),
            }}
          >
            <span className={'Arrows'}>
              <SortArrow
                colKey={colKey}
                mode={'ASC'}
                active={sortState.colName === colKey && sortState.direction === 'ASC'}
                onClick={() => onSort(colKey, 'ASC')}
              />
              <SortArrow
                colKey={colKey}
                mode={'DESC'}
                active={sortState.colName === colKey && sortState.direction === 'DESC'}
                onClick={() => onSort(colKey, 'DESC')}
              />
            </span>
            <span>
              {colKey}
            </span>
          </th>
        )
      )
    }
  </tr>
);

ColumnHeaders.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.string),
  sortState: PropTypes.shape(),
  onSort: PropTypes.func.isRequired,
};

ColumnHeaders.defaultProps = {
  cols: [],
  sortState: {},
};

export default ColumnHeaders;
