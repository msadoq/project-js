/* eslint-disable no-unused-vars,no-console */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import { ArrowKeyStepper, Grid, ScrollSync } from 'react-virtualized';

import Color from 'color';
import generateColor from 'string-to-color';
import shortid from 'shortid';
import { Glyphicon, Overlay, Popover } from 'react-bootstrap';

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

class VirtualizedTableView extends React.Component {

  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    tableName: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.any),
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    columnWidth: PropTypes.number,
    rowHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    withGroups: PropTypes.bool,
    onSort: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    bodyCellActions: PropTypes.arrayOf(PropTypes.shape()),
    onBodyCellAction: PropTypes.func.isRequired,
    onCellClick: PropTypes.func.isRequired,
    onCellDoubleClick: PropTypes.func.isRequired,
    sortState: PropTypes.shape(),
    filterState: PropTypes.shape(),
    bodyCellRendererDecorator: PropTypes.func,
  };

  static defaultProps = {
    tableName: null,
    columns: [],
    rows: [],
    columnWidth: 220,
    rowHeight: 22,
    width: 400,
    height: 400,
    bodyCellActions: null,
    withGroups: false,
    sortState: {},
    filterState: {},
    bodyCellRendererDecorator:
      (decoratedBodyCellRenderer, props) => decoratedBodyCellRenderer(props),
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
      totalCount,
      tableName,
      columns,
      rows,
      columnWidth,
      rowHeight,
      width,
      height,
      withGroups, // choose to display or not groups headers,
                  // in this case, columns objects should have `group` key
                  // WARNING: columns still should be in the right order (by group)
                  // as this component does not reorder them to match groups
      onSort,
      onFilter,
      bodyCellActions, // the user defined actions
      onBodyCellAction, // VirtualizedTableViewContainer way to dispacth user defined action
      onCellClick,
      onCellDoubleClick,
      sortState,
      filterState,
      bodyCellRendererDecorator,
    } = this.props;

    const columnCount = columns.length;
    const rowCount = rows.length;

    const tableWidth = width;
    const tableHeight = height;

    const overscanColumnCount = 0;
    const overscanRowCount = 0;

    const _getColumnName = col => col.field;

    const _groups = columns.reduce((acc, column) => {
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
    const _filterCellRenderer = ({ columnIndex, key, rowIndex, style }) => {
      const colKey = columns[columnIndex].field;

      return (
        <div
          key={key}
          className={styles.Filter}
          style={style}
        >
          <input
            type={'text'}
            value={filterState[columnIndex]}
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
      const content = rows[rowIndex][columnIndex];
      const rowClassName = rowIndex % 2 ? styles.oddRow : styles.evenRow;
      const lastRowClassName = rowIndex === rows.length - 1 ? styles.lastRow : '';
      const lastColumnClassName = columnIndex === columns.length - 1 ? styles.lastColumn : '';

      let updatedStyle = {
        ...style,
      };

      if (withGroups) {
        const groupName = columns[columnIndex].group;
        const groupColorInfo = _groupColors[groupName];

        updatedStyle = {
          ...style,
          backgroundColor: style.backgroundColor || groupColorInfo.fadedColor,
          boxShadow: `-.5px -.5px 0 ${groupColorInfo.darkenedColor}`,
        };
      }

      const _onClick = (ev) => {
        ev.preventDefault();
        // onCellClick(rowIndex, columnIndex, content);
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

      return (
        <div
          className={
            cn(
              styles.bodyCell,
              rowClassName,
              lastRowClassName,
              lastColumnClassName,
              {
                [styles.selectedCell]: isCellSelected,
              }
            )
          }
          key={key}
          style={updatedStyle}
          onClick={_onClick}
          onDoubleClick={_onDoubleClick}
        >
          <span>{content.value}</span>
        </div>
      );
    };

    const _enhancedBodyCellRenderer = props =>
      bodyCellRendererDecorator(_bodyCellRenderer, props);

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

    let countStr = `${rows.length}`;

    if (rows.length < totalCount) {
      countStr = `${countStr}/${totalCount}`;
    }

    return (
      <div>
        <div className={styles.tableHeader}>{`${tableName} (${countStr})`}</div>
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
                                width={tableWidth}
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
                            width={tableWidth}
                            height={30}
                            columnWidth={columnWidth}
                            rowHeight={30}
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
                            width={tableWidth}
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
                            cellRenderer={_enhancedBodyCellRenderer}
                            className={styles.BodyGrid}
                            width={tableWidth}
                            height={tableHeight}
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
                </div>
              </div>
            )
          }
        </ScrollSync>
      </div>
    );
  }
}

export default VirtualizedTableView;
