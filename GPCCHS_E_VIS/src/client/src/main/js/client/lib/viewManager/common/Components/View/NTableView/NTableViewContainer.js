/* eslint-disable react/no-find-dom-node */
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {
  filterColumn,
  toggleColumnSort,
  scrollRows,
} from 'store/actions/tableColumns';

import NTableView from './NTableView';

const mapStateToProps = (state, { container }) => {
  const containerNode = ReactDOM.findDOMNode(container);
  const height = (containerNode && containerNode.clientHeight) || 0;
  return {
    height,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId }) => ({
  onFilter: (col, value) => {
    dispatch(filterColumn(viewId, tableId, col, value));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, tableId, col, mode));
  },
  onScroll: (ev, offset) => {
    ev.preventDefault();
    dispatch(scrollRows(viewId, tableId, offset));
  },
});

const NTableViewContainer = connect(mapStateToProps, mapDispatchToProps)(NTableView);

export default NTableViewContainer;
