/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ScrollSync, AutoSizer, ArrowKeyStepper, Grid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import styles from './VirtualizedTableView.css';


const VirtualizedTableView =
  ({
     columns,
     rows,
     columnWidth,
     rowHeight,
     height,
     onCellClick,
     onCellDoubleClick,
   }) => {
    const columnCount = columns.length;
    const rowCount = rows.length;
    const maxWidth = columnCount * columnWidth;

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.name;
    const _getValue = obj => obj.value;

// eslint-disable-next-line react/prop-types
    const _headerCellRenderer = ({ columnIndex, key, style }) => {
      const content = _getColumnName(columns[columnIndex]);

      return (
        <div
          className={styles.headerCell}
          key={key}
          style={style}
        >
          {content}
        </div>
      );
    };

// eslint-disable-next-line react/prop-types
    const _bodyCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      const content = _getValue(rows[rowIndex][columnIndex]);
      const rowClassName = rowIndex % 2 ? styles.oddRow : styles.evenRow;

      const _onClick = () => {
        onCellClick(rowIndex, columnIndex, content);
      };

      const _onDoubleClick = () => {
        onCellDoubleClick(rowIndex, columnIndex, content);
      };

      return (
        <div
          className={cn(styles.bodyCell, rowClassName)}
          key={key}
          style={style}
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
  onCellClick: PropTypes.func.isRequired,
  onCellDoubleClick: PropTypes.func.isRequired,
};

VirtualizedTableView.defaultProps = {
  columns: [],
  rows: [],
  columnWidth: 220,
  rowHeight: 22,
  height: 400,
};

export default VirtualizedTableView;
