/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import cn from 'classnames';
import { Grid, ScrollSync } from 'react-virtualized';
import ContainerDimensions from 'react-container-dimensions';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import shortid from 'shortid';
import { Overlay, Popover } from 'react-bootstrap';
import Draggable from 'react-draggable';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { updateSearchCountArray } from 'store/reducers/pages';
import SortArrow from './SortArrow';

import styles from './VirtualizedTableView.css';

class VirtualizedTableView extends React.Component {
  static propTypes = {
    tableName: PropTypes.string,
    cols: PropTypes.arrayOf(PropTypes.any),
    columnCount: PropTypes.number.isRequired,
    rows: PropTypes.oneOfType(
      [
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
        PropTypes.func,
      ]
    ).isRequired,
    rowCount: PropTypes.number,
    totalRowCount: PropTypes.number,
    columnWidth: PropTypes.number,
    rowHeight: PropTypes.number,
    withGroups: PropTypes.bool,
    onSort: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    bodyCellActions: PropTypes.arrayOf(PropTypes.shape()),
    onBodyCellAction: PropTypes.func.isRequired,
    onCellDoubleClick: PropTypes.func.isRequired,
    sortState: PropTypes.shape(),
    filterState: PropTypes.shape(),
    overrideStyle: PropTypes.func,
    tableHeader: PropTypes.func,
    saveScroll: PropTypes.func.isRequired,
    scrollPosition: PropTypes.shape(),
    searchForThisView: PropTypes.bool,
    searching: PropTypes.string,
    onResizeColumn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tableName: 'Data table',
    cols: [],
    rows: [],
    rowCount: 0,
    totalRowCount: 0,
    columnWidth: 220,
    rowHeight: 22,
    bodyCellActions: null,
    withGroups: false,
    sortState: {},
    filterState: {},
    overrideStyle: () => ({}),
    tableHeader: null,
    scrollPosition: null,
    searchForThisView: false,
    searching: null,
  };

  constructor(props, context) {
    super(props, context);
    const { cols } = props;

    this.state = {
      selectedCell: null,
      count: 0,
    };

    this.inputRefs = {};
    cols.forEach((colKey) => {
      this.inputRefs[colKey] = React.createRef();
    });
  }

  componentDidUpdate() {
    ['groupHeaderGrid', 'headerGrid', 'filterGrid', 'mainGrid'].forEach((gridKey) => {
      const currentGrid = this[gridKey];
      if (currentGrid) {
        currentGrid.recomputeGridSize();
      }
    });
  }

  _onScrollbarPresenceChange = ({ vertical }) => {
    this.setState({
      isVerticalScrollbarDisplayed: vertical,
    });
  };

  _onUpdateFilter = (colKey, newFilterValue) => {
    const { onFilter } = this.props;

    const _deferredOnFilter = () => {
      this.setState({
        selectedCell: null,
      });

      onFilter(colKey, newFilterValue);
    };

    return _.debounce(500, _deferredOnFilter);
  };

  _onSelectCell(ev, rowIndex, columnIndex, content) {
    const isAlreadySelected =
      this.state.selectedCell &&
      this.state.selectedCell.rowIndex === rowIndex &&
      this.state.selectedCell.columnIndex === columnIndex;

    if (isAlreadySelected) { // unselect cell if user clicked on it again
      this.setState({
        selectedCell: null,
      });

      return;
    }

    this.setState({
      selectedCell: {
        target: ev.target,
        rowIndex,
        columnIndex,
        content,
      },
    });
  }

  render() {
    const {
      tableName,
      cols,
      rows,
      rowCount,
      totalRowCount,
      columnWidth,
      rowHeight,
      withGroups, // choose to display or not groups headers,
                  // in this case, cols objects should have `group` key
                  // WARNING: cols still should be in the right order (by group)
                  // as this component does not reorder them to match groups
      onSort,
      bodyCellActions, // the user defined actions
      onBodyCellAction, // VirtualizedTableViewContainer way to dispacth user defined action
      onCellDoubleClick,
      sortState,
      filterState,
      overrideStyle,
      columnCount,
      tableHeader,
      saveScroll,
      scrollPosition,
      searching,
      searchForThisView,
      onResizeColumn,
    } = this.props;

    const formattedRows = rows;

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.title;

    const _totalColumnWidth = cols.reduce((acc, cur) => acc + (cur.width || columnWidth), 0);

    const _getColumnWidth = ({ index }) => cols[index].width || columnWidth;// eslint-disable-next-line react/prop-types

    const _resizerTool = (colKey, height) =>
      <Draggable
        axis="x"
        defaultClassName="DragHandle"
        defaultClassNameDragging="DragHandleActive"
        onDrag={(event, { deltaX }) => {
          onResizeColumn(colKey, deltaX);
        }}
        position={{ x: 0 }}
        zIndex={999}
      >
        <div
          className={styles.DragHandleIcon}
          style={{ height }}
        >{}</div>
      </Draggable>;

    const _groupHeaderCellRenderer = ({ columnIndex, key, style }) => {
      const groupName = cols[columnIndex].group;
      const colKey = _getColumnName(cols[columnIndex]);

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
          {_resizerTool(colKey, 22)}
        </div>
      );
    };

    // eslint-disable-next-line react/prop-types
    const _headerCellRenderer = ({ columnIndex, key, style }) => {
      const currentCol = cols[columnIndex];
      const colKey = _getColumnName(currentCol);
      const colLabel = currentCol.label;

      let headerStyle = _.cloneDeep(style);

      if (withGroups) {
        headerStyle = {
          ...headerStyle,
          backgroundColor: '#d8d8d8',
          border: '1px solid darkgrey',
        };
      }

      return (
        <div
          className={styles.headerCell}
          key={key}
          style={headerStyle}
        >
          <span
            className={styles.Label}
            title={colLabel || colKey}
          >
            {colLabel || colKey}
          </span>
          <SortArrow
            colKey={colKey}
            mode={'ASC'}
            active={sortState.colName === colKey && sortState.direction === 'ASC'}
            onClick={() => {
              this.setState({
                selectedCell: null,
              });
              onSort(colKey, 'ASC');
            }}
          />
          <SortArrow
            colKey={colKey}
            mode={'DESC'}
            active={sortState.colName === colKey && sortState.direction === 'DESC'}
            onClick={() => {
              this.setState({
                selectedCell: null,
              });
              onSort(colKey, 'DESC');
            }}
          />
          {_resizerTool(colKey, 44)}
        </div>
      );
    };

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
            ref={this.inputRefs[colKey]}
            defaultValue={filterState[colKey]}
            type={'text'}
            onChange={(ev) => {
              this._onUpdateFilter(colKey, ev.target.value)();
            }}
            className={styles.SearchInput}
          />
        </div>
      );
    };

    // eslint-disable-next-line react/prop-types
    const _bodyCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      let content = { value: undefined };

      if (Array.isArray(formattedRows)) {
        content = formattedRows[rowIndex][columnIndex];
      }

      if (typeof formattedRows === 'function') {
        content = formattedRows({ rowIndex, columnIndex, cols });
      }

      let updatedStyle = {
        ...style,
      };

      if (withGroups) {
        updatedStyle = {
          ...updatedStyle,
          borderBottom: '1px solid darkgrey',
        };
      }

      if (rowIndex % 2) {
        updatedStyle = {
          ...updatedStyle,
          backgroundColor: '#e6e6e6',
        };
      }

      if (searchForThisView && content.colKey === 'epName' && (content.value).indexOf(searching) !== -1) {
        updatedStyle = {
          ...updatedStyle,
          backgroundColor: '#FC0',
        };
      }

      const _onClick = (ev) => {
        ev.preventDefault();
        this._onSelectCell(ev, rowIndex, columnIndex, content);
      };

      const _onDoubleClick = (ev) => {
        ev.preventDefault();
        onCellDoubleClick(rowIndex, columnIndex, content);
      };

      const isCellSelected =
        this.state.selectedCell &&
        this.state.selectedCell.rowIndex === rowIndex &&
        this.state.selectedCell.columnIndex === columnIndex;

      if (content.color) {
        updatedStyle = {
          ...updatedStyle,
          color: content.color,
        };
      }

      let defaultCellEventProps = {
        onMouseEnter: _onClick,
        onMouseLeave: _onClick,
      };

      if (bodyCellActions) {
        defaultCellEventProps = {
          onClick: _onClick,
        };
      }

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={
            cn(
              styles.bodyCell,
              {
                [styles.oddRow]: rowIndex % 2,
                [styles.evenRow]: !(rowIndex % 2),
                [styles.lastRow]: rowIndex === (rowCount - 1),
                [styles.lastColumn]: columnIndex === (cols.length - 1),
                [styles.selectedCell]: isCellSelected,
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
          <span>{content.value}</span>
        </div>
      );
    };

    let bodyCellOverlay = null;

    if (this.state.selectedCell) {
      const { content, rowIndex, columnIndex } = this.state.selectedCell;

      const popoverContent = _.get(['tooltip', 'body'], content);

      const actionsMenu = (bodyCellActions || []).map(
        (actionElem, idx) => (
          <div className={styles.ActionItem}>
            <a
              key={shortid.generate()}
              tabIndex={idx}
              onClick={() => {
                onBodyCellAction(actionElem.label, content, rowIndex, columnIndex);
              }}
            >
              {actionElem.label}
            </a>
          </div>
        )
      );

      const popover = (
        <Popover
          id="cell-popover"
          title={_.get(['tooltip', 'title'], content)}
        >
          {popoverContent}
          {
            popoverContent &&
            actionsMenu &&
            (actionsMenu.length > 0) ?
              <hr /> :
              null
          }
          {actionsMenu}
        </Popover>
      );

      const overlayPlacement = (columnIndex === cols.length - 1) ? 'left' : 'right';

      bodyCellOverlay = (popoverContent || (actionsMenu && actionsMenu.length > 0)) ?
        (
          <Overlay
            show
            container={this}
            placement={overlayPlacement}
            target={this.state.selectedCell.target}
          >
            {popover}
          </Overlay>
        ) : null;
    }


    const _getCountStr = () => {
      if (rowCount !== null && totalRowCount !== null) {
        if (!rowCount && !totalRowCount) {
          return 'NO DATA';
        }

        return `${rowCount}/${totalRowCount}`;
      }

      return 'NO DATA';
    };

    let updatedRowCount = rowCount;

    if (rowCount === 0) {
      updatedRowCount = 1;
    }

    const columnsWidth = _totalColumnWidth;
    const headerHeight = 42;

    const extendedRowHeight = rowHeight * 2;

    const header =
      tableHeader ||
      <div className={styles.tableHeader}>{`${tableName} (${_getCountStr()})`}</div>;

    return (
      <ErrorBoundary>
        <ContainerDimensions>
          {
            ({ width, height }) => {
              const adjustedWidth = Math.min(width - scrollbarSize(), columnsWidth);
              let mainGridAdjustedWidth = adjustedWidth;

              if (this.state.isVerticalScrollbarDisplayed) {
                mainGridAdjustedWidth += scrollbarSize();
              }

              let adjustedHeight = height - headerHeight - (3 * rowHeight) - scrollbarSize();

              if (withGroups) {
                // take into account the space taken by the additional row
                // used to display group names
                adjustedHeight -= rowHeight;
              }

              let scrollProps = {};

              if (scrollPosition) {
                scrollProps = {
                  scrollTop: scrollPosition.scrollTop,
                  scrollLeft: scrollPosition.scrollLeft,
                };
              }

              return (<div>
                {header}
                <ScrollSync className={styles.container}>
                  {
                    (
                      {
                        onScroll,
                        scrollLeft,
                        scrollTop,
                      }
                    ) => (
                      <div className={styles.GridRow}>
                        {bodyCellOverlay}
                        <div className={styles.GridColumn}>
                          <div>
                            {
                              withGroups ?
                                <Grid
                                  ref={(node) => {
                                    this.groupHeaderGrid = node;
                                  }}
                                  cellRenderer={_groupHeaderCellRenderer}
                                  className={styles.HeaderGrid}
                                  width={adjustedWidth}
                                  height={rowHeight}
                                  columnWidth={_getColumnWidth}
                                  estimatedColumnSize={columnsWidth}
                                  rowHeight={rowHeight}
                                  scrollLeft={scrollLeft}
                                  scrollTop={scrollTop}
                                  columnCount={columnCount}
                                  rowCount={1}
                                  overscanColumnCount={overscanColumnCount}
                                /> : null
                            }
                            <Grid
                              ref={(node) => {
                                this.headerGrid = node;
                              }}
                              cellRenderer={_headerCellRenderer}
                              className={styles.HeaderGrid}
                              width={adjustedWidth}
                              height={extendedRowHeight}
                              columnWidth={_getColumnWidth}
                              estimatedColumnSize={columnsWidth}
                              rowHeight={extendedRowHeight}
                              scrollLeft={scrollLeft}
                              scrollTop={scrollTop}
                              columnCount={columnCount}
                              rowCount={1}
                              overscanColumnCount={overscanColumnCount}
                            />
                            <Grid
                              ref={(node) => {
                                this.filterGrid = node;
                              }}
                              cellRenderer={_filterCellRenderer}
                              className={styles.HeaderGrid}
                              width={adjustedWidth}
                              height={rowHeight}
                              columnWidth={_getColumnWidth}
                              estimatedColumnSize={_totalColumnWidth}
                              rowHeight={rowHeight}
                              scrollLeft={scrollLeft}
                              scrollTop={scrollTop}
                              columnCount={columnCount}
                              rowCount={1}
                              overscanColumnCount={overscanColumnCount}
                            />
                            <Grid
                              ref={(node) => {
                                this.mainGrid = node;
                              }}
                              cellRenderer={_bodyCellRenderer}
                              className={styles.BodyGrid}
                              width={mainGridAdjustedWidth}
                              height={adjustedHeight}
                              columnWidth={_getColumnWidth}
                              estimatedColumnSize={_totalColumnWidth}
                              rowHeight={rowHeight}
                              columnCount={columnCount}
                              rowCount={updatedRowCount}
                              scrollLeft={scrollLeft}
                              scrollTop={scrollTop}
                              onScroll={(...args) => {
                                saveScroll(args[0]);
                                onScroll(...args);
                              }}
                              overscanColumnCount={overscanColumnCount}
                              overscanRowCount={overscanRowCount}
                              {...scrollProps}
                              onScrollbarPresenceChange={this._onScrollbarPresenceChange}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  }
                </ScrollSync>
              </div>);
            }
          }
        </ContainerDimensions>
      </ErrorBoundary>
    );
  }
}

export default VirtualizedTableView;
