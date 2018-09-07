import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Grid } from 'react-virtualized';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styles from './VirtualizedTableView.css';
import SortArrow from './SortArrow';
import ResizerTool from './ResizerTool';


const HeadersGrid =
  ({
     gridRef,
     cols,
     columnName,
     columnWidth,
     withGroups,
     sortState,
     onSort,
     onResizeColumn,
     width,
     height,
     rowHeight,
     estimatedColumnsSize,
     scrollLeft,
     scrollTop,
     columnCount,
     overscanColumnCount,
     scrollToTop,
   }) => {
    // eslint-disable-next-line react/prop-types
    const _headerCellRenderer = ({ columnIndex, key, style }) => {
      const currentCol = cols[columnIndex];
      const colKey = columnName(currentCol);
      const colLabel = currentCol.label;
      const colTooltip = currentCol.tooltip;

      let headerStyle = _.cloneDeep(style);

      const popoverStyle = {
        height: 37,
      };

      const popover = (<Popover
        id="header-cell-popover"
        style={popoverStyle}
        placement="bottom"
      >
        {colTooltip}
      </Popover>);

      if (withGroups) {
        headerStyle = {
          ...headerStyle,
          backgroundColor: '#d8d8d8',
          border: '1px solid darkgrey',
        };
      }

      const overlayTrigger = ['hover', 'focus'];

      const ret =
        (
          <div
            className={styles.headerCell}
            key={key}
            style={headerStyle}
          >
            <span
              className={styles.Label}
            >
              {colLabel || colKey}
            </span>
            <SortArrow
              colKey={colKey}
              mode={'ASC'}
              active={sortState.colName === colKey && sortState.direction === 'ASC'}
              onClick={() => {
                onSort(colKey, 'ASC');
                scrollToTop();
              }}
            />
            <SortArrow
              colKey={colKey}
              mode={'DESC'}
              active={sortState.colName === colKey && sortState.direction === 'DESC'}
              onClick={() => {
                onSort(colKey, 'DESC');
                scrollToTop();
              }}
            />
            <ResizerTool
              colKey={colKey}
              height={44}
              onDrag={onResizeColumn}
            />
          </div>
        );

      if (!colTooltip) {
        return ret;
      }

      return (
        <OverlayTrigger
          trigger={overlayTrigger}
          placement="bottom"
          overlay={popover}
        >
          {ret}
        </OverlayTrigger>
      );
    };

    return (
      <Grid
        ref={gridRef}
        cellRenderer={_headerCellRenderer}
        className={styles.HeaderGrid}
        width={width}
        height={height}
        columnWidth={columnWidth}
        estimatedColumnSize={estimatedColumnsSize}
        rowHeight={rowHeight}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        columnCount={columnCount}
        rowCount={1}
        overscanColumnCount={overscanColumnCount}
      />
    );
  };

HeadersGrid.propTypes = {
  gridRef: PropTypes.func.isRequired,
  cols: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  columnName: PropTypes.func.isRequired,
  columnWidth: PropTypes.func.isRequired,
  withGroups: PropTypes.bool.isRequired,
  sortState: PropTypes.shape().isRequired,
  onSort: PropTypes.func.isRequired,
  onResizeColumn: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  estimatedColumnsSize: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  overscanColumnCount: PropTypes.number.isRequired,
  scrollToTop: PropTypes.func.isRequired,
};

export default HeadersGrid;
