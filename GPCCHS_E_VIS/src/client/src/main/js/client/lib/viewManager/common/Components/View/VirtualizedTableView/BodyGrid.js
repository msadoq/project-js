import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Grid } from 'react-virtualized';
import cn from 'classnames';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import styles from './VirtualizedTableView.css';

const BodyGrid =
  ({
     gridRef,
     rows,
     cols,
     searchForThisView,
     searching,
     onCellDoubleClick,
     selectedRows,
     selectableRows,
     overrideStyle,
     width,
     height,
     columnWidth,
     estimatedColumnsSize,
     rowHeight,
     columnCount,
     rowCount,
     scrollLeft,
     scrollTop,
     onScroll,
     overscanColumnCount,
     overscanRowCount,
     onScrollbarPresenceChange,
     hoveredCell,
     onCellEnter,
     onCellLeave,
     onToggleRow,
     isVerticalScrollbarDisplayed,
   }) => {
    // eslint-disable-next-line react/prop-types
    const _bodyCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      let content = { value: undefined };

      if (Array.isArray(rows)) {
        content = rows[rowIndex][columnIndex];
      }

      if (typeof rows === 'function') {
        content = rows({ rowIndex, columnIndex, cols });
      }

      let updatedStyle = {
        ...style,
      };

      if (
        searchForThisView && content.colKey === 'epName' &&
        searching.length >= 2 &&
        (content.value).indexOf(searching) !== -1
      ) {
        updatedStyle = {
          ...updatedStyle,
          backgroundColor: '#FC0',
        };
      }

      const _onDoubleClick = (ev) => {
        ev.preventDefault();
        onCellDoubleClick(rowIndex, columnIndex, content);
      };

      const isCellHovered = !!hoveredCell &&
        hoveredCell.content.rowId === content.rowId &&
        hoveredCell.content.colKey === content.colKey;

      const isRowHovered = !!hoveredCell &&
        hoveredCell.content.rowId === content.rowId;

      const isRowSelected = _.has(content.rowId, selectedRows);

      if (content.color) {
        updatedStyle = {
          ...updatedStyle,
          color: content.color,
        };
      }

      const _onMouseEnter = (ev) => {
        ev.preventDefault();
        onCellEnter(ev, { content });
      };

      const _onMouseLeave = (ev) => {
        ev.preventDefault();
        onCellLeave(ev, { content });
      };

      const _onClick = (ev) => {
        ev.preventDefault();

        if (selectableRows) {
          onToggleRow(content);
        }
      };

      const defaultCellEventProps = {
        onMouseEnter: _onMouseEnter,
        onMouseLeave: _onMouseLeave,
        onClick: _onClick,
      };

      const formatText = (text) => {
        if (typeof text === 'string') {
          return text;
        }

        return JSON.stringify(text);
      };

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={
            cn(
              styles.bodyCell,
              {
                [styles.oddRow]: rowIndex % 2,
                [styles.evenRow]: !(rowIndex % 2),
                [styles.hoveredCell]: !selectableRows && isCellHovered,
                [styles.hoveredRow]: selectableRows && isRowHovered,
                [styles.selectedRow]: isRowSelected,
              }
            )
          }
          key={key}
          style={{
            ...updatedStyle,
            ...overrideStyle({ columnIndex, key, rowIndex, style, content }),
          }}
          onDoubleClick={_onDoubleClick}
          {...defaultCellEventProps}
          title={content.info}
        >
          <span>{formatText(content.value)}</span>
        </div>
      );
    };

    let adjustedWidth = width;

    if (isVerticalScrollbarDisplayed) {
      adjustedWidth += scrollbarSize();
    }

    return (
      <Grid
        ref={gridRef}
        cellRenderer={_bodyCellRenderer}
        className={styles.BodyGrid}
        width={adjustedWidth}
        height={height}
        columnWidth={columnWidth}
        estimatedColumnSize={estimatedColumnsSize}
        rowHeight={rowHeight}
        columnCount={columnCount}
        rowCount={rowCount}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        onScroll={onScroll}
        overscanColumnCount={overscanColumnCount}
        overscanRowCount={overscanRowCount}
        onScrollbarPresenceChange={onScrollbarPresenceChange}
      />
    );
  };

BodyGrid.propTypes = {
  gridRef: PropTypes.func.isRequired,
  rows: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.shape())]).isRequired,
  cols: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  searchForThisView: PropTypes.bool.isRequired,
  searching: PropTypes.string.isRequired,
  onCellDoubleClick: PropTypes.func.isRequired,
  selectedRows: PropTypes.shape(),
  selectableRows: PropTypes.bool.isRequired,
  overrideStyle: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  columnWidth: PropTypes.func.isRequired,
  estimatedColumnsSize: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
  overscanColumnCount: PropTypes.number.isRequired,
  overscanRowCount: PropTypes.number.isRequired,
  onScrollbarPresenceChange: PropTypes.func.isRequired,
  hoveredCell: PropTypes.shape(),
  onCellEnter: PropTypes.func.isRequired,
  onCellLeave: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  isVerticalScrollbarDisplayed: PropTypes.bool.isRequired,
};

BodyGrid.defaultProps = {
  selectedRows: {},
  hoveredCell: null,
};

export default BodyGrid;
