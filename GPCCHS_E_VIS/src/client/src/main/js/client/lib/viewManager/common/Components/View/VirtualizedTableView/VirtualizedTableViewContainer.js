import _ from 'lodash/fp';

import { connect } from 'react-redux';

import { filterColumn, toggleColumnSort } from 'store/actions/tableColumns';
import { pause } from 'store/actions/hsc';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';
import { filter, sort } from '../../../../common/data/table';


const mapStateToProps = (state, { viewId, tableId, rows, rowCount, totalRowCount }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];

  const { cols, sorting, filters, name } = tableConfig;

  const _getRows = () => {
    if (Array.isArray(rows)) {
      const formattedRows = sort(filter(rows, tableConfig), tableConfig);
      const colIndexesToRemove = cols.filter(col => !col.displayed);

      return formattedRows.map(row => _.omit(colIndexesToRemove, row));
    }

    return rows;
  };

  const reducedColumns = cols.filter(col => col.displayed);

  return {
    tableName: name,
    rows: _getRows(),
    rowCount,
    totalRowCount,
    cols: reducedColumns,
    columnCount: reducedColumns.length,
    sortState: sorting,
    filterState: filters,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId, bodyCellActions, pauseOnScroll }) => ({
  onScrollTop: () => {
    if (pauseOnScroll) {
      dispatch(pause());
    }
  },
  onFilter: (col, value, filters) => {
    dispatch(filterColumn(viewId, tableId, col, value, filters));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, tableId, col, mode));
  },
  onBodyCellAction: (name, data, rowIndex, columnIndex) => {
    const action = bodyCellActions.find(actionElem => actionElem.label === name);

    if (action) {
      if (!action.onClick) {
        console.error(`[NotImplementedError] onClick is not defined for action [${action.label}]`);
      }

      action.onClick(data, rowIndex, columnIndex);
    }
  },
  onCellDoubleClick: (i, j, content) => {
    console.error('[NotImplementedError] Double-click on cell has not yet been implemented');
    console.info(i, j, content);
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onFilter: (col, value) => {
    dispatchProps.onFilter(col, value, {
      ...stateProps.filterState,
      [col]: value,
    });
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
