import _ from 'lodash/fp';

import { connect } from 'react-redux';

import { filterColumn, toggleColumnSort } from 'store/actions/tableColumns';
import { pause } from 'store/actions/hsc';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';
import { getViewType } from '../../../../../store/reducers/views';


const mapStateToProps = (state, { viewId, tableId }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];

  const { cols: tableCols, sorting, filters, name } = tableConfig;

  const tableData =
    _.getOr(
      [],
      [
        `${getViewType(state, { viewId })}Data`,
        viewId,
        tableId,
      ],
      state
    );

  const data = _.getOr([], 'data', tableData);
  const keep = _.getOr([], 'keep', tableData);


  const sortingDirection =
    _.getOr('DESC', ['sorting', 'direction'], tableConfig);

  const totalRowCount = data.length;
  const rowCount = keep.length;

  const rows = ({ rowIndex, columnIndex, cols }) => {
    const virtualRowIndex =
      sortingDirection === 'DESC' ?
        rowIndex :
        rowCount - rowIndex - 1;

    const content =
      _.get(keep[virtualRowIndex], data);

    if (content) {
      const colKey = cols[columnIndex].title;
      const { color } = content;

      return {
        value: content[colKey],
        color,
      };
    }

    return { value: undefined };
  };
  // end rows

  const reducedColumns = tableCols.filter(col => col.displayed);

  return {
    tableName: name,
    rows,
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
  onSort: (col, mode, filters) => {
    dispatch(toggleColumnSort(viewId, tableId, col, mode, filters));
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
  onSort: (col, mode) => {
    dispatchProps.onSort(col, mode, stateProps.filterState);
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
