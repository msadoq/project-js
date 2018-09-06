/* eslint-disable no-unused-vars,react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import cn from 'classnames';
import { Grid, ScrollSync } from 'react-virtualized';
import ContainerDimensions from 'react-container-dimensions';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { Overlay, OverlayTrigger, Popover } from 'react-bootstrap';
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
    onCellDoubleClick: PropTypes.func.isRequired,
    sortState: PropTypes.shape(),
    filterState: PropTypes.shape(),
    overrideStyle: PropTypes.func,
    tableHeader: PropTypes.func,
    searchForThisView: PropTypes.bool,
    searching: PropTypes.string,
    onResizeColumn: PropTypes.func.isRequired,
    estimatedColumnsSize: PropTypes.number.isRequired,
    tableRef: PropTypes.func,
    virtualIndex: PropTypes.func,
    selectableRows: PropTypes.bool,
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
    searchForThisView: false,
    searching: null,
    tableRef: () => {
    },
    virtualIndex: _.identity,
    selectableRows: false,
  };

  static _wrapHoveredCell(ev, { rowIndex, columnIndex, content }) {
    return {
      target: ev.target,
      content,
    };
  }

  static _isSameContent(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }

    return a.rowId === b.rowId && a.colKey === b.colKey;
  }

  constructor(props, context) {
    super(props, context);
    const { cols } = props;

    this.state = {
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
        currentGrid.measureAllCells();
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
      this.scrollToTop();
    };

    return _.debounce(500, _deferredOnFilter);
  };

  _onSelectRow(content) {
    const updatedState = _.set(
      ['selectedRows', content.rowId],
      content,
      this.state
    );

    this.setState(updatedState);
  }

  _onUnselectRow(content) {
    const updatedState = _.unset(
      ['selectedRows', content.rowId],
      this.state
    );

    this.setState(updatedState);
  }

  _onToggleRow(content) {
    const selectedRows = _.getOr({}, 'selectedRows', this.state);

    if (!_.has(content.rowId, selectedRows)) {
      this._onSelectRow(content);
      return;
    }

    this._onUnselectRow(content);
  }

  _onCellEnter(ev, { content }) {
    const hoveredCell = VirtualizedTableView._wrapHoveredCell(ev, { content });
    const updatedState = _.set('hoveredCell', hoveredCell, this.state);

    this.setState(updatedState);
  }

  _onCellLeave(ev, { content }) {
    const existingHoveredCell = _.get('hoveredCell', this.state);
    const { content: existingHoveredContent } = existingHoveredCell;

    if (VirtualizedTableView._isSameContent(content, existingHoveredContent)) {
      const updatedState = _.set('hoveredCell', null, this.state);
      this.setState(updatedState);
    }
  }

  scrollToRow(rowIndex) {
    if (this.mainGrid) {
      const { totalRowCount } = this.props;

      let rowIndexToScrollTo = rowIndex;

      if (rowIndex > totalRowCount) {
        rowIndexToScrollTo = rowIndex;
      } else {
        const { virtualIndex } = this.props;

        if (typeof virtualIndex === 'function') {
          rowIndexToScrollTo = virtualIndex(rowIndex);
        }
      }

      this.mainGrid.scrollToCell({ rowIndex: rowIndexToScrollTo });
    }
  }

  scrollToTop() {
    if (this.mainGrid) {
      this.mainGrid.scrollToCell({ rowIndex: 0 });
    }
  }

  scrollToBottom() {
    if (this.mainGrid) {
      this.mainGrid.scrollToCell({ rowIndex: 0 });
    }
  }

  getSelectedRows() {
    return Object.values(_.getOr({}, 'selectedRows', this.state));
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
      onCellDoubleClick,
      sortState,
      filterState,
      overrideStyle,
      columnCount,
      estimatedColumnsSize,
      tableHeader,
      searching,
      searchForThisView,
      onResizeColumn,
    } = this.props;

    const formattedRows = rows;

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.title;

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
                this.scrollToTop();
              }}
            />
            <SortArrow
              colKey={colKey}
              mode={'DESC'}
              active={sortState.colName === colKey && sortState.direction === 'DESC'}
              onClick={() => {
                onSort(colKey, 'DESC');
                this.scrollToTop();
              }}
            />
            {_resizerTool(colKey, 44)}
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
      const { selectableRows } = this.props;

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

      if (
        searchForThisView && content.colKey === 'epName' &&
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

      const hoveredCell = _.get('hoveredCell', this.state);

      const isCellHovered = !!hoveredCell &&
        hoveredCell.content.rowId === content.rowId &&
        hoveredCell.content.colKey === content.colKey;

      const isRowHovered = !!hoveredCell &&
        hoveredCell.content.rowId === content.rowId;

      const isRowSelected = _.has(content.rowId, this.state.selectedRows);

      if (content.color) {
        updatedStyle = {
          ...updatedStyle,
          color: content.color,
        };
      }

      const _onMouseEnter = (ev) => {
        ev.preventDefault();
        this._onCellEnter(ev, { content });
      };

      const _onMouseLeave = (ev) => {
        ev.preventDefault();
        this._onCellLeave(ev, { content });
      };

      const _onClick = (ev) => {
        ev.preventDefault();

        if (this.props.selectableRows) {
          this._onToggleRow(content);
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

    let bodyCellOverlay = null;

    const hoveredCell = _.get('hoveredCell', this.state);

    if (hoveredCell) {
      const { content, columnIndex } = hoveredCell;

      const popoverContent = _.get(['tooltip', 'body'], content);

      const popover = (
        <Popover
          id="cell-popover"
          title={_.get(['tooltip', 'title'], content)}
        >
          {popoverContent}
        </Popover>
      );

      const overlayPlacement = (columnIndex === cols.length - 1) ? 'left' : 'right';

      bodyCellOverlay = popoverContent ?
        (
          <Overlay
            show
            container={this}
            placement={overlayPlacement}
            target={_.get(['hoveredCell', 'target'], this.state)}
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
              const adjustedWidth =
                Math.min(width - scrollbarSize(), estimatedColumnsSize);
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

              return (
                <div
                  ref={() => {
                    this.props.tableRef(this);
                  }}
                >
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
                                    estimatedColumnSize={estimatedColumnsSize}
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
                                estimatedColumnSize={estimatedColumnsSize}
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
                                estimatedColumnSize={estimatedColumnsSize}
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
                                estimatedColumnSize={estimatedColumnsSize}
                                rowHeight={rowHeight}
                                columnCount={columnCount}
                                rowCount={updatedRowCount}
                                scrollLeft={scrollLeft}
                                scrollTop={scrollTop}
                                onScroll={onScroll}
                                overscanColumnCount={overscanColumnCount}
                                overscanRowCount={overscanRowCount}
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
