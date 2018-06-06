import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { ArrowKeyStepper, Grid, ScrollSync } from 'react-virtualized';
import ContainerDimensions from 'react-container-dimensions';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import Color from 'color';
import generateColor from 'string-to-color';
import shortid from 'shortid';
import { Overlay, Popover } from 'react-bootstrap';

import SortArrow from './SortArrow';

import styles from './VirtualizedTableView.css';


class VirtualizedTableView extends React.Component {
  static propTypes = {
    tableName: PropTypes.string,
    cols: PropTypes.arrayOf(PropTypes.any),
    columnCount: PropTypes.number.isRequired,
    rows: PropTypes.oneOfType(
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
      PropTypes.func
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
    rowCount: null,
    totalRowCount: null,
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
    this.state = {
      selectedCell: null,
    };
  }

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
      onFilter,
      bodyCellActions, // the user defined actions
      onBodyCellAction, // VirtualizedTableViewContainer way to dispacth user defined action
      onCellDoubleClick,
      sortState,
      filterState,
      overrideStyle,
      onScrollTop,
      columnCount,
    } = this.props;

    let formattedRows = rows;

    if (formattedRows.length === 0) { // add dummy row to avoid scroll issues
      formattedRows =
        [[...Array(cols.length)].reduce(acc => [...acc, { value: undefined }], [])];
    }

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.title;

    const _groups = cols.reduce((acc, column) => {
      if (column.group) {
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
    const _groupHeaderCellRenderer = ({ columnIndex, key, style }) => {
      const groupName = cols[columnIndex].group;

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
      const colKey = _getColumnName(cols[columnIndex]);

      let headerStyle = _.cloneDeep(style);

      if (withGroups) {
        const groupName = cols[columnIndex].group;
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
            type={'text'}
            value={filterState[colKey]}
            onChange={(ev) => {
              this.setState({
                selectedCell: null,
              });
              onFilter(colKey, ev.target.value);
            }}
            className={styles.SearchInput}
          />
        </div>
      );
    };

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

      if (withGroups) {
        const groupName = cols[columnIndex].group;
        const groupColorInfo = _groupColors[groupName];

        updatedStyle = {
          ...style,
          backgroundColor: style.backgroundColor || groupColorInfo.fadedColor,
          boxShadow: `-.5px -.5px 0 ${groupColorInfo.darkenedColor}`,
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

      if (content.textColor) {
        updatedStyle = {
          ...updatedStyle,
          color: content.textColor,
        };
      }

      return (
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
      if (rowCount && totalRowCount) {
        return `${rowCount}/${totalRowCount}`;
      }

      return null;
    };

    const columnsWidth = columnWidth * columnCount;
    const headerHeight = 42;

    const extendedRowHeight = rowHeight * 2;

    return (
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
    );
  }
}

export default VirtualizedTableView;
