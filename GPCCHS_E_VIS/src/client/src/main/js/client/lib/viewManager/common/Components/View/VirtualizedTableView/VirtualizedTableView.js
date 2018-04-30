/* eslint-disable no-unused-vars,no-console */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { ScrollSync, AutoSizer, ArrowKeyStepper, Grid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import Color from 'color';
import generateColor from 'string-to-color';
import { Glyphicon } from 'react-bootstrap';

import styles from './VirtualizedTableView.css';

const SortArrow = ({ colKey, mode, active, onClick }) => (
  <span
    role={'presentation'}
    onClick={() => onClick(colKey, mode)}
    className={cn(styles.SortArrow, { [styles.active]: active })}
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

const VirtualizedTableView =
  ({
     columns,
     rows,
     columnWidth,
     rowHeight,
     height,
     withGroups, // choose to display or not groups headers,
                 // in this case, columns objects should have `group` key
                 // WARNING: columns still should be in the right order (by group)
                 // as this component does not reorder them to match groups
     onSort,
     onFilter,
     onCellClick,
     onCellDoubleClick,
     sortState,
     filterState,
   }) => {
    const columnCount = columns.length;
    const rowCount = rows.length;

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.name;
    const _getValue = obj => obj.value;

    const _groups = columns.reduce((acc, column) => {
      if (columns.indexOf(column) > -1) {
        return [...acc, column.group];
      }

      return acc;
    }, []);

    const _getPastelColor = color =>
      Color.rgb(
        (color.red() + 255) / 2,
        (color.blue() + 255) / 2,
        (color.green() + 255) / 2
      );

    const _groupColors = _groups.reduce((acc, groupName) => {
      const color = _getPastelColor(new Color(generateColor(groupName)));

      return {
        ...acc,
        [groupName]: {
          color: color.hsl().string(),
          darkenedColor: color.darken(0.5).hsl().string(),
          fadedColor: color.fade(0.7).hsl().string(),
          isDark: color.isDark(),
        },
      };
    }, {});

// eslint-disable-next-line react/prop-types
    const _groupHeaderCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      const groupName = columns[columnIndex].group;

      const groupColorInfo = _groupColors[groupName];

      const groupHeaderStyle = {
        ...style,
        backgroundColor: groupColorInfo.color,
        color: groupColorInfo.isDark ? 'white' : 'black',
        border: `1px solid ${groupColorInfo.darkenedColor}`,
      };

      return (
        <div
          className={styles.headerCell}
          key={key}
          style={groupHeaderStyle}
        >
          {groupName}
        </div>
      );
    };

// eslint-disable-next-line react/prop-types
    const _headerCellRenderer = ({ columnIndex, key, style }) => {
      const colKey = _getColumnName(columns[columnIndex]);

      let headerStyle = _.cloneDeep(style);

      if (withGroups) {
        const groupName = columns[columnIndex].group;
        const groupColorInfo = _groupColors[groupName];

        headerStyle = {
          ...headerStyle,
          backgroundColor: groupColorInfo.color,
          color: groupColorInfo.isDark ? 'white' : 'black',
          border: `1px solid ${groupColorInfo.darkenedColor}`,
        };
      }

      return (
        <div
          className={styles.headerCell}
          key={key}
          style={headerStyle}
        >
          <span className={styles.Arrows}>
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
          <span className={styles.Label}> {colKey} </span>
        </div>
      );
    };

// eslint-disable-next-line react/prop-types
    const _filterCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      const colKey = columns[columnIndex].name;

      return (
        <div
          key={key}
          className={styles.Filter}
          style={style}
        >
          <input
            type={'text'}
            value={filterState[columnIndex]}
            onChange={ev => onFilter(colKey, ev.target.value)}
            className={styles.SearchInput}
          />
        </div>
      );
    };

// eslint-disable-next-line react/prop-types
    const _bodyCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      const content = _getValue(rows[rowIndex][columnIndex]);
      const rowClassName = rowIndex % 2 ? styles.oddRow : styles.evenRow;

      let updatedStyle = {
        ...style,
      };

      if (withGroups) {
        const groupName = columns[columnIndex].group;
        const groupColorInfo = _groupColors[groupName];

        updatedStyle = {
          ...style,
          backgroundColor: groupColorInfo.fadedColor,
          boxShadow: `-.5px -.5px 0 ${groupColorInfo.darkenedColor}`,
        };
      }

      const _onClick = (ev) => {
        ev.preventDefault();
        onCellClick(rowIndex, columnIndex, content);
      };

      const _onDoubleClick = (ev) => {
        ev.preventDefault();
        onCellDoubleClick(rowIndex, columnIndex, content);
      };

      return (
        <div
          className={cn(styles.bodyCell, rowClassName)}
          key={key}
          style={updatedStyle}
          onClick={_onClick}
          onDoubleClick={_onDoubleClick}
        >
          <span>{content}</span>
        </div>
      );
    };

    return (
      <ScrollSync className={styles.container}>
        {
          (
            {
              onScroll,
              scrollLeft,
            }
          ) => (
            <div className={styles.GridRow}>
              <div className={styles.GridColumn}>
                <AutoSizer disableHeight>
                  {
                    ({ width }) => (
                      <ArrowKeyStepper
                        columnCount={columnCount}
                        rowCount={rowCount}
                      >
                        {
                          ({ onSectionRendered, scrollToColumn, scrollToRow }) => (
                            <div>
                              {
                                withGroups ?
                                  <Grid
                                    cellRenderer={_groupHeaderCellRenderer}
                                    className={styles.HeaderGrid}
                                    width={width - scrollbarSize()}
                                    height={rowHeight}
                                    columnWidth={columnWidth}
                                    rowHeight={rowHeight}
                                    scrollLeft={scrollLeft}
                                    onScroll={onScroll}
                                    columnCount={columnCount}
                                    rowCount={1}
                                    overscanColumnCount={overscanColumnCount}
                                    onSectionRendered={onSectionRendered}
                                    scrollToColumn={scrollToColumn}
                                    scrollToRow={scrollToRow}
                                  /> : null
                              }
                              <Grid
                                cellRenderer={_headerCellRenderer}
                                className={styles.HeaderGrid}
                                width={width - scrollbarSize()}
                                height={rowHeight}
                                columnWidth={columnWidth}
                                rowHeight={rowHeight}
                                scrollLeft={scrollLeft}
                                columnCount={columnCount}
                                rowCount={1}
                                overscanColumnCount={overscanColumnCount}
                                onSectionRendered={onSectionRendered}
                                scrollToColumn={scrollToColumn}
                                scrollToRow={scrollToRow}
                              />
                              <Grid
                                cellRenderer={_filterCellRenderer}
                                className={styles.HeaderGrid}
                                width={width - scrollbarSize()}
                                height={rowHeight}
                                columnWidth={columnWidth}
                                rowHeight={rowHeight}
                                scrollLeft={scrollLeft}
                                columnCount={columnCount}
                                rowCount={1}
                                overscanColumnCount={overscanColumnCount}
                                onSectionRendered={onSectionRendered}
                                scrollToColumn={scrollToColumn}
                                scrollToRow={scrollToRow}
                              />
                              <Grid
                                cellRenderer={_bodyCellRenderer}
                                className={styles.BodyGrid}
                                width={width}
                                height={height}
                                columnWidth={columnWidth}
                                rowHeight={rowHeight}
                                columnCount={columnCount}
                                rowCount={rowCount}
                                onScroll={onScroll}
                                overscanColumnCount={overscanColumnCount}
                                overscanRowCount={overscanRowCount}
                                onSectionRendered={onSectionRendered}
                                scrollToColumn={scrollToColumn}
                                scrollToRow={scrollToRow}
                              />
                            </div>
                          )
                        }
                      </ArrowKeyStepper>
                    )
                  }
                </AutoSizer>
              </div>
            </div>
          )
        }
      </ScrollSync>
    );
  };

VirtualizedTableView.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  columnWidth: PropTypes.number,
  rowHeight: PropTypes.number,
  height: PropTypes.number,
  withGroups: PropTypes.bool,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onCellDoubleClick: PropTypes.func.isRequired,
  sortState: PropTypes.shape(),
  filterState: PropTypes.shape(),
};

VirtualizedTableView.defaultProps = {
  columns: [],
  rows: [],
  columnWidth: 220,
  rowHeight: 22,
  height: 400,
  withGroups: false,
  sortState: {},
  filterState: {},
};

export default VirtualizedTableView;
