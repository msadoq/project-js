/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Label, Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';
import _ from 'lodash/fp';

import withScroll from './withScroll';
import styles from './TableView.css';

const FilterIcon = ({ onClick }) => (
  <Label
    title="Filter by column"
    className={classnames({
      [styles.clickableMargin]: true,
    })}
  >
    <Glyphicon onClick={() => onClick()} glyph="filter" />
  </Label>
);
FilterIcon.propTypes = {
  onClick: PropTypes.func,
};
FilterIcon.defaultProps = {
  onClick: _.noop,
};

const FilterInput = ({ onInput, column, value }) => (
  <input
    type="text"
    value={value}
    onInput={e => onInput(column, e.target.value)}
  />
);
FilterInput.propTypes = {
  value: PropTypes.string,
  column: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
};
FilterInput.defaultProps = {
  value: '',
};

const CollapseButton = ({ onClick, collapsed }) => (
  <Label
    title={collapsed ? 'Expand' : 'Collapse'}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
    className={classnames({
      [styles.clickableMargin]: true,
    })}
  >
    <Glyphicon glyph={collapsed ? 'plus' : 'minus'} />
  </Label>
);
CollapseButton.propTypes = {
  onClick: PropTypes.func,
  collapsed: PropTypes.bool,
};
CollapseButton.defaultProps = {
  onClick: _.noop,
  collapsed: false,
};

const Arrow = ({ mode }) => (
  <Label
    className={classnames({
      [styles.sortArrow]: true,
    })}
  >
    <Glyphicon glyph={mode === 'ASC' ? 'chevron-up' : 'chevron-down'} />
  </Label>
);
Arrow.propTypes = {
  mode: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
};

// Used because we need an additional column for expand/collapse
const getColumns = cols => ['', ...cols];

const Table = ({
  rows, position, nbDisplayedRows, rowHeight, filters,
  cols, subCols, getIsHovered, getIsSelected, getIsExpanded, getIsSelectable,
  disableSelection, disableSelectionReason, sort, enableSearch,
  onCollapse, onUncollapse, onClickRow, onClickFilterIcon,
  onMouseEnter, onMouseLeave, toggleSort, onSearch,
}) => (
  <table className={classnames('TableView', styles.container)}>
    <thead>
      {enableSearch && <tr
        style={{ height: `${rowHeight}px` }}
      >
        {
          getColumns(cols).map(col => (
            <th
              key={col}
              className={col !== '' && styles.filters}
            >
              {
                col !== ''
                ? <FilterInput value={filters[col]} column={col} onInput={onSearch} />
                : <FilterIcon onClick={onClickFilterIcon} />
              }
            </th>
          ))
        }
      </tr>}
      <tr
        style={{ height: `${rowHeight}px` }}
      >
        {
          getColumns(cols).map(col => (
            <th
              onClick={() => (
                col !== '' && toggleSort(col)
              )}
              className={classnames({
                [styles.header]: col !== '',
              })}
              key={col}
            >
              { col === '' && !enableSearch && <FilterIcon onClick={onClickFilterIcon} /> }
              { sort.column === col && <Arrow mode={sort.mode} /> }
              {col}
            </th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        _.slice(position, nbDisplayedRows + position)(rows).map((row, i) => {
          const data = row.data;
          const key = i; // TODO replace 'i' by a better key
          const columns = row.type === 'row' ? getColumns(cols) : getColumns(subCols);
          if (row.type === 'row' || row.type === 'subrow') {
            return (
              <tr
                title={disableSelection ? disableSelectionReason : ''}
                onMouseEnter={() => onMouseEnter(row)}
                onMouseLeave={() => onMouseLeave(row)}
                onClick={() => onClickRow(row)}
                key={key}
                className={classnames({
                  [styles.notAllowed]: disableSelection,
                  [styles.selectable]: getIsSelectable(row) && !disableSelection,
                  [styles.hover]: getIsHovered(row),
                  tableSubRow: row.type === 'subrow',
                  tableRow: row.type === 'row',
                  selected: getIsSelected(row),
                })}
                style={{ width: '100%', height: `${rowHeight}px` }}
              >
                {
                  columns.map((col, index) => (
                    <td
                      className={classnames({
                        [styles.collapseColumn]: index === 0,
                      })}
                      key={col}
                    >
                      {
                        index === 0 && row.type === 'row'
                        && (getIsExpanded(row) ? (
                          <CollapseButton onClick={() => onCollapse(row)} />
                        ) : (
                          <CollapseButton collapsed onClick={() => onUncollapse(row)} />
                        ))
                      }
                      {data[col]}
                    </td>
                  ))
                }
              </tr>
            );
          }
          return (
            <tr
              title={disableSelection ? disableSelectionReason : ''}
              onMouseEnter={() => onMouseEnter(row)}
              onMouseLeave={() => onMouseLeave(row)}
              onClick={() => onClickRow(row)}
              style={{ height: `${rowHeight}px` }}
              className={classnames({
                [styles.notAllowed]: disableSelection,
                [styles.selectable]: getIsSelectable(row) && !disableSelection,
                [styles.hover]: getIsHovered(row),
                tableSubRow: true,
                selected: getIsSelected(row),
              })}
              key={key}
            >
              {
                row.type === 'subrow_header' ? (
                  getColumns(subCols).map((col, index) => (
                    <th
                      className={classnames({
                        [styles.collapseColumn]: index === 0,
                      })}
                      key={col}
                    >
                      {col}
                    </th>
                  ))
                ) : [
                  <th
                    className={classnames({
                      [styles.collapseColumn]: true,
                    })}
                    key="1"
                  />,
                  <th
                    style={{ fontStyle: 'italic' }}
                    key="2"
                    colSpan={getColumns(subCols).length - 1}
                  >
                    { row.data }
                  </th>,
                ]
              }
            </tr>
          );
        })
      }
    </tbody>
  </table>
);

Table.propTypes = {
  onClickRow: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onUncollapse: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  toggleSort: PropTypes.func.isRequired,
  onClickFilterIcon: PropTypes.func,
  onSearch: PropTypes.func,
  enableSearch: PropTypes.bool,
  getIsSelectable: PropTypes.func,
  getIsSelected: PropTypes.func,
  getIsExpanded: PropTypes.func,
  getIsHovered: PropTypes.func,
  position: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.any,
    type: PropTypes.string.isRequired,
    mainRow: PropTypes.shape({}).isRequired,
  })).isRequired,
  sort: PropTypes.shape({
    column: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['ASC', 'DESC']).isRequired,
  }).isRequired,
  filters: PropTypes.shape({}),
  rowHeight: PropTypes.number.isRequired,
  nbDisplayedRows: PropTypes.number.isRequired,
  disableSelection: PropTypes.bool.isRequired,
  disableSelectionReason: PropTypes.string,
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  subCols: PropTypes.arrayOf(PropTypes.string).isRequired,
};
Table.defaultProps = {
  getIsSelectable: _.always(false),
  getIsSelected: _.always(false),
  getIsExpanded: _.always(false),
  getIsHovered: _.always(false),
  onClickFilterIcon: _.noop,
  onSearch: _.noop,
  filters: {},
  enableSearch: false,
  position: 0,
  subColsTitle: '',
  disableSelectionReason: 'You cannot select a row',
};

export default withScroll(Table);
