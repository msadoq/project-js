import { connect } from 'react-redux';
import { getViewConfigurationTableColumns } from 'store/selectors/views';
import { reorderColumns, toggleColumn } from 'store/actions/tableColumns';

import TableColumnsEditor from './TableColumnsEditor';


const mapStateToProps = (state, { viewId, tableId }) => {
  const columns = getViewConfigurationTableColumns(state, { viewId, tableId });

  const groupedColumns = columns.reduce((acc, cur, index) => {
    const currentGroupKey = cur.group || '';
    const currentGroup = acc[currentGroupKey] || {};

    return {
      ...acc,
      [currentGroupKey]: [
        ...currentGroup,
        {
          ...cur,
          index,
        },
      ],
    };
  }, {});

  return {
    groupedColumns,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId }) => ({
  toggle: (index) => {
    dispatch(toggleColumn(viewId, tableId, index));
  },
  reorder: (oldIndex, newIndex) => {
    console.log(oldIndex, newIndex);
    dispatch(reorderColumns(viewId, tableId, oldIndex, newIndex));
  },
});

const TableColumnsEditorContainer =
  connect(mapStateToProps, mapDispatchToProps)(TableColumnsEditor);

export default TableColumnsEditorContainer;
