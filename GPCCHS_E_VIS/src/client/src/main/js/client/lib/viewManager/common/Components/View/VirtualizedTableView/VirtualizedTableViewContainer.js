/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';

import { filterColumn, toggleColumnSort } from 'store/actions/tableColumns';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';


const mapStateToProps = (state, { viewId, tableId, rows }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];

  const { columns, sorting, filters } = tableConfig;

  return {
    columns,
    sortState: sorting,
    filterState: filters,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId, bodyCellActions }) => ({
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

      action.onClick(dispatch, data, rowIndex, columnIndex);
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

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
