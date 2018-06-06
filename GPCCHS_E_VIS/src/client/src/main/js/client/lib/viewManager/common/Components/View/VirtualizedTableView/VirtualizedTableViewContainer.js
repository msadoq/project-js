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

      const colIndexesToRemove = cols.reduce((acc, cur, index) => {
        if (!cur.displayed) {
          return [...acc, index];
        }

        return acc;
      }, []);

      return formattedRows.reduce((acc, cur) => [
        ...acc,
        cur.filter((_, index) => colIndexesToRemove.indexOf(index) === -1),
      ], []);
    }

    return rows;
  };

  const reducedColumns = cols.reduce((acc, cur) => {
    if (cur.displayed) {
      return [...acc, cur];
    }

    return acc;
  }, []);

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
  onCellDoubleClick: (i, j, content) => {
    console.error('[NotImplementedError] Double-click on cell has not yet been implemented');
    console.info(i, j, content);
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
