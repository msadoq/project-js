import _ from 'lodash/fp';

import { connect } from 'react-redux';

import {
  filterColumn,
  toggleColumnSort,
  updateColumnWidth,
} from 'store/actions/tableColumns';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';
import { getViewType } from '../../../../../store/reducers/views';
import getLogger from '../../../../../common/logManager';
import { shouldKeepElement } from '../../../../commonData/reducer';

const logger = getLogger('viewManager');

const mapStateToProps = (state, { viewId, tableId, contentModifier, data }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];

  const { cols: tableCols, sorting, filters, name } = tableConfig;

  const sortingDirection =
    _.getOr('DESC', ['sorting', 'direction'], tableConfig);

  const sortingColName =
    _.get(['sorting', 'colName'], tableConfig);

  const reducedColumns = tableCols.filter(col => col.displayed);

  const estimatedColumnsSize =
    reducedColumns.reduce((acc, cur) => acc + (cur.width || 220), 0);

  const _getModifiedContent = ({ content, cols, columnIndex }) => {
    const _contentModifier = contentModifier || _.identity;

    if (content) {
      const colKey = cols[columnIndex].title;
      const { color } = content;

      return _contentModifier({
        value: content[colKey],
        color,
        colKey,
      }, content);
    }

    return { value: undefined };
  };

  const _computeRowPropsFromState = () => {
    const tableState =
      _.getOr(
        [],
        [
          `${getViewType(state, { viewId })}Data`,
          viewId,
          'tables',
          tableId,
        ],
        state
      );

    const tableData = _.getOr([], 'data', tableState);
    const keep = _.getOr([], 'keep', tableState);

    const totalRowCount = tableData.length;
    const rowCount = keep.length;

    const virtualIndex =
      rowIndex =>
        (
          sortingDirection === 'DESC' ?
            rowIndex :
            rowCount - rowIndex - 1
        );

    const _invertedKeep = _.invert(keep);

    /**
     * Transforms absolute index into the virtual index that is used to display the content in
     * virtualized tabel view
     * @param rowIndex
     * @returns {*}
     */
    const virtualIndexFromAbsoluteIndex =
      rowIndex =>
        virtualIndex(_invertedKeep[rowIndex]);

    const rows = ({ rowIndex, columnIndex, cols }) => {
      const virtualRowIndex = virtualIndex(rowIndex);

      const content =
        _.get(keep[virtualRowIndex], tableData);

      const _contentModifier = contentModifier || _.identity;

      if (content) {
        const colKey = cols[columnIndex].title;
        const { color } = content;

        return _contentModifier({
          value: content[colKey],
          color,
          colKey,
        }, content);
      }

      return { value: undefined };
    };

    return {
      rows,
      rowCount,
      totalRowCount,
      virtualIndex: virtualIndexFromAbsoluteIndex, // maps an absolute index to its virtual version
    };
  };

  const _computeRowPropsFromDataProp = () => {
    const _sort = arr => _.orderBy([sortingColName], [sortingDirection.toLowerCase()], arr);
    const _filter = arr => arr.filter(el => shouldKeepElement(el, filters));

    const totalRowCount = data.length;
    const formattedData = _sort(_filter(data));
    const rowCount = formattedData.length;

    const rows =
      ({ rowIndex, columnIndex, cols }) =>
        _getModifiedContent({ content: formattedData[rowIndex], cols, columnIndex });

    return {
      rows,
      rowCount,
      totalRowCount,
    };
  };

  const rowProps =
    data ?
      _computeRowPropsFromDataProp() :
      _computeRowPropsFromState();

  return {
    tableName: name,
    ...rowProps,
    cols: reducedColumns,
    columnCount: reducedColumns.length,
    estimatedColumnsSize,
    sortState: sorting,
    filterState: filters,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId, bodyCellActions }) => ({
  onFilter: (col, value, filters) => {
    dispatch(filterColumn(viewId, tableId, col, value, filters));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, tableId, col, mode));
  },
  onResizeColumn: (colKey, delta) => {
    dispatch(updateColumnWidth(viewId, tableId, colKey, delta));
  },
  onBodyCellAction: (name, data, rowIndex, columnIndex) => {
    const action = bodyCellActions.find(actionElem => actionElem.label === name);

    if (action) {
      if (!action.onClick) {
        logger.error(`[NotImplementedError] onClick is not defined for action [${action.label}]`);
      }

      action.onClick(data, rowIndex, columnIndex);
    }
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
  onCellDoubleClick: (i, j, content) => {
    if (typeof ownProps.onCellDoubleClick === 'function') {
      ownProps.onCellDoubleClick(i, j, content);
    } else {
      logger.error('[NotImplementedError] Double-click on cell has not yet been implemented');
      logger.info(i, j, content);
    }
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
