import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';

import styles from './VirtualizedTableView.css';


const FiltersGrid =
  ({
     gridRef,
     inputRefs,
     cols,
     filterState,
     width,
     height,
     columnWidth,
     estimatedColumnsSize,
     scrollLeft,
     scrollTop,
     columnCount,
     overscanColumnCount,
     onUpdateFilter,
   }) => {
    // eslint-disable-next-line react/prop-types
    const _filterCellRenderer = ({ columnIndex, key, style }) => {
      const colKey = cols[columnIndex].title;

      return (
        <div
          key={key}
          className={styles.Filter}
          style={style}
        >
          <input
            key={colKey}
            ref={(node) => {
              inputRefs(node, colKey);
            }}
            defaultValue={filterState[colKey]}
            type={'text'}
            onChange={(ev) => {
              onUpdateFilter(colKey, ev.target.value)();
            }}
            className={styles.SearchInput}
          />
        </div>
      );
    };

    return (
      <Grid
        ref={gridRef}
        cellRenderer={_filterCellRenderer}
        className={styles.HeaderGrid}
        width={width}
        height={height}
        columnWidth={columnWidth}
        estimatedColumnSize={estimatedColumnsSize}
        rowHeight={height}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
        columnCount={columnCount}
        rowCount={1}
        overscanColumnCount={overscanColumnCount}
      />
    );
  };

FiltersGrid.propTypes = {
  gridRef: PropTypes.func.isRequired,
  inputRefs: PropTypes.func.isRequired,
  cols: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filterState: PropTypes.shape().isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  columnWidth: PropTypes.func.isRequired,
  estimatedColumnsSize: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number.isRequired,
  scrollTop: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  overscanColumnCount: PropTypes.number.isRequired,
  onUpdateFilter: PropTypes.func.isRequired,
};

export default FiltersGrid;
