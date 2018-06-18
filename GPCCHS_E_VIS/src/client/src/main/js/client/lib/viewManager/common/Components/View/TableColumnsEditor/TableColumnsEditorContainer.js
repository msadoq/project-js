import { connect } from 'react-redux';
import { getViewConfigurationTableColumns } from 'store/selectors/views';
import { reorderColumns, toggleColumn } from 'store/actions/tableColumns';

import TableColumnsEditor from './TableColumnsEditor';


const mapStateToProps = (state, { viewId, tableId }) => {
  const columns = getViewConfigurationTableColumns(state, { viewId, tableId });

  /**
   * Groups `columns` by group key. The returned object is a mapping between group keys and
   * the sub-array representing the columns belonging to the group,
   * _i.e_ the columns whose group field is set to the group key.
   * whose
   *
   * @var groupedColumns
   */
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
    dispatch(reorderColumns(viewId, tableId, oldIndex, newIndex));
  },
});

const TableColumnsEditorContainer =
  connect(mapStateToProps, mapDispatchToProps)(TableColumnsEditor);

export default TableColumnsEditorContainer;
