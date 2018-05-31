import { connect } from 'react-redux';

import { filterColumn, toggleColumnSort } from 'store/actions/tableColumns';
import { pause } from 'store/actions/hsc';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';
import { getIsPlaying } from '../../../../../store/reducers/hsc';


const mapStateToProps = (state, { viewId, tableId, rows }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];
  const isPlaying = getIsPlaying(state);

  const { cols, sorting, filters, name } = tableConfig;

  const colIndexesToRemove = cols.reduce((acc, cur, index) => {
    if (!cur.displayed) {
      return [...acc, index];
    }

    return acc;
  }, []);

  const reducedRows = rows.rows.reduce((acc, cur) => [
    ...acc,
    cur.filter((_, index) => colIndexesToRemove.indexOf(index) === -1),
  ], []);

  const reducedColumns = cols.reduce((acc, cur) => {
    if (cur.displayed) {
      return [...acc, cur];
    }

    return acc;
  }, []);

  const reducedColumnCount = reducedColumns.length;

  return {
    rows: reducedRows,
    cols: reducedColumns,
    sortState: sorting,
    filterState: filters,
    tableName: name,
    columnCount: reducedColumnCount,
    totalCount: rows.totalCount,
    isPlaying,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId, bodyCellActions, pauseOnScroll }) => ({
  onScrollTop: () => {
    if (pauseOnScroll) {
      dispatch(pause());
    }
  },
  onFilter: (col, value) => {
    dispatch(filterColumn(viewId, tableId, col, value));
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
  onCellClick: (i, j, content) => {
    console.error('[NotImplementedError] Click on cell has not yet been implemented');
    console.info(i, j, content);
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
  onScrollTop: () => {
    if (stateProps.isPlaying) {
      dispatchProps.onScrollTop();
    }
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
