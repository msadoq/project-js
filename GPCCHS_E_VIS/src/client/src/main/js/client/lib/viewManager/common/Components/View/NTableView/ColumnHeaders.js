/* eslint-disable no-unused-vars,jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Color from 'color';
import generateColor from 'string-to-color';

import { Glyphicon } from 'react-bootstrap';

import './ColumnHeaders.scss';


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

const ColumnHeaders = ({ width, cols, sortState, onSort }) => (
  <tr className={'ColumnHeaders'}>
    {
      Object
        .keys(cols)
        .map(
          (colKey) => {
            const groupKey = cols[colKey];
            const groupColor = new Color(generateColor(groupKey));
            const borderColor = groupColor.darken(0.5);

            return (
              <th
                key={`${colKey}$col-header`}
                style={{
                  backgroundColor: groupColor.hsl().string(),
                  borderBottom: `2px solid ${borderColor.hsl().string()}`,
                  width,
                }}
              >
                <div>
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
                  <span className={'Label'}>
                    {colKey}
                  </span>
                </div>
              </th>
            );
          }
        )
    }
  </tr>
);

ColumnHeaders.propTypes = {
  width: PropTypes.number,
  cols: PropTypes.shape(),
  sortState: PropTypes.shape(),
  onSort: PropTypes.func.isRequired,
};

ColumnHeaders.defaultProps = {
  width: 160,
  cols: [],
  sortState: {},
};

export default ColumnHeaders;
