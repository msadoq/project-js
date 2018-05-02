/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';

import { filterColumn, toggleColumnSort } from 'store/actions/tableColumns';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';

// TODO: remove mapStateToProps
// This is only for test purposes and each component using VirtualizedTableViewContainer
// should implement its own data management system
const mapStateToProps = (state, { viewId, tableId }) => {
  /* BEGIN toremove */
  const generateColumns = n =>
    Array(...Array(n))
      .map((_, index) =>
        ({
          name: `c${index}`,
          group: `g${Math.floor(index / 3)}`, // this groups elements by 3
        })
      );
  const generateRows =
    (n, m) =>
      Array(...Array(m))
        .map(
          (_, rowIndex) =>
            Array(...Array(n)).map((__, colIndex) =>
              ({
                value: `(${rowIndex}, ${colIndex})`,
              })
            ));

  const N = 10000;

  const COLS = generateColumns(10);
  const ROWS = generateRows(10, N);
  /* END toremove */

  // TODO: get columns from configuration and remove test data

  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];

  return {
    columns: COLS,
    rows: ROWS,
    sortState: tableConfig.sorting,
    filterState: tableConfig.filters,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId }) => ({
  onFilter: (col, value) => {
    dispatch(filterColumn(viewId, tableId, col, value));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, tableId, col, mode));
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
