import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { ArrowKeyStepper, Grid, ScrollSync } from 'react-virtualized';
import ContainerDimensions from 'react-container-dimensions';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import shortid from 'shortid';
import { Overlay, Popover } from 'react-bootstrap';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
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
    onScrollTop: PropTypes.func.isRequired,
    overrideStyle: PropTypes.func,
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
  };

  constructor(props, context) {
    super(props, context);
    const { cols } = props;

    this.state = {
      selectedCell: null,
    };

    this.inputRefs = {};
    cols.forEach((colKey) => {
      this.inputRefs[colKey] = React.createRef();
    });
  }

  _onUpdateFilter = (colKey, newFilterValue) => {
    const { onFilter } = this.props;

    const _deferredOnFilter = () => {
      this.setState({
        selectedCell: null,
      });

      onFilter(colKey, newFilterValue);
    };

    return _.debounce(_deferredOnFilter, 500);
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
      onScrollTop,
      columnCount,
    } = this.props;

    const formattedRows = rows;

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.title;

// eslint-disable-next-line react/prop-types
    const _groupHeaderCellRenderer = ({ columnIndex, key, style }) => {
      const groupName = cols[columnIndex].group;

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
        </div>
      );
    };

// eslint-disable-next-line react/prop-types
    const _headerCellRenderer = ({ columnIndex, key, style }) => {
      const colKey = _getColumnName(cols[columnIndex]);

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
            title={colKey}
          >
            {colKey}
          </span>
          <span className={styles.Arrows}>
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
          </span>
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
            ...overrideStyle({ columnIndex, key, rowIndex, style }),
          }}
          onClick={_onClick}
          onDoubleClick={_onDoubleClick}
        >
          <span>{content.value}</span>
        </div>
      );
    };

    let bodyCellOverlay = null;

    if (this.state.selectedCell) {
      const { content, rowIndex, columnIndex } = this.state.selectedCell;

      const popoverContent = _.get(content, ['tooltip', 'body'], null);
      const actionsMenu = (bodyCellActions || []).map(
        actionElem =>
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <a
            key={shortid.generate()}
            onClick={() => {
              onBodyCellAction(actionElem.label, content, rowIndex, columnIndex);
            }}
          >
            {actionElem.label}
          </a>
      );

      const popover = (
        <Popover
          id="cell-popover"
          title={_.get(content, ['tooltip', 'title'], null)}
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

      bodyCellOverlay = (popoverContent || (actionsMenu && actionsMenu.length > 0)) ?
        (
          <Overlay
            show
            container={this}
            placement={'right'}
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

    const columnsWidth = columnWidth * columnCount;
    const headerHeight = 42;

    const extendedRowHeight = rowHeight * 2;

    return (
      <ErrorBoundary>
        <ContainerDimensions>
          {
            ({ width, height }) => {
              const adjustedWidth = Math.min(width - scrollbarSize(), columnsWidth);
              let adjustedHeight = height - headerHeight - (3 * rowHeight) - scrollbarSize();

              if (withGroups) {
                // take into account the space taken by the additional row
                // used to display group names
                adjustedHeight -= rowHeight;
              }

              return (
                <div>
                  <div className={styles.tableHeader}>{`${tableName} (${_getCountStr()})`}</div>
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
                                          width={adjustedWidth}
                                          height={rowHeight}
                                          columnWidth={columnWidth}
                                          rowHeight={rowHeight}
                                          scrollLeft={scrollLeft}
                                          scrollTop={scrollTop}
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
                                      width={adjustedWidth}
                                      height={extendedRowHeight}
                                      columnWidth={columnWidth}
                                      rowHeight={extendedRowHeight}
                                      scrollLeft={scrollLeft}
                                      scrollTop={scrollTop}
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
                                      width={adjustedWidth}
                                      height={rowHeight}
                                      columnWidth={columnWidth}
                                      rowHeight={rowHeight}
                                      scrollLeft={scrollLeft}
                                      scrollTop={scrollTop}
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
                                      width={adjustedWidth}
                                      height={adjustedHeight}
                                      columnWidth={columnWidth}
                                      rowHeight={rowHeight}
                                      columnCount={columnCount}
                                      rowCount={rowCount}
                                      scrollLeft={scrollLeft}
                                      scrollTop={scrollTop}
                                      onScroll={(...args) => {
                                        if (scrollTop !== args[0].scrollTop) {
                                          onScrollTop();
                                        }
                                        onScroll(...args);
                                      }}
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
                          </div>
                        </div>
                      )
                    }
                  </ScrollSync>
                </div>
              );
            }
          }
        </ContainerDimensions>
      </ErrorBoundary>
    );
  }
}

export default VirtualizedTableView;
