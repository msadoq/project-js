import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import styles from './VirtualizedTableView.css';
import ResizerTool from './ResizerTool';


const GroupHeadersGrid =
  ({
     gridRef,
     cols,
     width,
     rowHeight,
     columnName,
     columnWidth,
     estimatedColumnsSize,
     scrollLeft,
     scrollTop,
     columnCount,
     overscanColumnCount,
     onResizeColumn,
     show,
   }) => {
// eslint-disable-next-line react/prop-types
    const _groupHeaderCellRenderer = ({ columnIndex, key, style }) => {
      const groupName = cols[columnIndex].group;
      const colKey = columnName(cols[columnIndex]);

      const groupHeaderStyle = {
        ...style,
        backgroundColor: '#d8d8d8',
        border: '1px solid darkgrey',
      };

      return (
        <div
          className={styles.headerCell}
          key={key}
          style={groupHeaderStyle}
        >
          {groupName}
          <ResizerTool
            colKey={colKey}
            height={22}
            onDrag={onResizeColumn}
          />
        </div>
      );
    };

    return show ?
      <Grid
        ref={gridRef}
        cellRenderer={_groupHeaderCellRenderer}
        className={styles.HeaderGrid}
        width={width}
        height={rowHeight}
        columnWidth={columnWidth}
        estimatedColumnSize={estimatedColumnsSize}
        rowHeight={rowHeight}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        columnCount={columnCount}
        rowCount={1}
        overscanColumnCount={overscanColumnCount}
      /> : null;
  };

GroupHeadersGrid.propTypes = {
  gridRef: PropTypes.func.isRequired,
  cols: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  width: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  columnName: PropTypes.func.isRequired,
  columnWidth: PropTypes.func.isRequired,
  estimatedColumnsSize: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  overscanColumnCount: PropTypes.number.isRequired,
  onResizeColumn: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default GroupHeadersGrid;
