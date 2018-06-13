/* eslint-disable quote-props,no-unused-vars,arrow-body-style */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : HistoryView work with real data .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Remove labels from props.data in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Create first basic table for HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add selected current to HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add rowHeight prop to HistoryView component
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getConfigurationByViewId } from 'viewManager';
import { getData } from 'viewManager/HistoryView/store/dataReducer';
import { addEntryPoint } from 'store/actions/views';
import { toggleColumnSort, filterColumn, scrollRows } from 'store/actions/tableColumns';
import HistoryView from './HistoryView';


const mapStateToProps = (state, { viewId }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const historyConfig = config.tables.history;

  const { data, indexes } = getData(state, { viewId });

  const usedIndexName = _.getOr('referenceTimestamp', ['sorting', 'colName'], historyConfig);
  const sortingDirection = _.getOr('DESC', ['sorting', 'direction'], historyConfig);

  const usedIndex = _.getOr([], [usedIndexName], indexes);

  const totalRowCount = usedIndex.length;
  const rowCount = totalRowCount;

  const rows = ({ rowIndex, columnIndex, cols }) => {
    const virtualRowIndex =
      sortingDirection === 'DESC' ?
        rowIndex :
        totalRowCount - rowIndex - 1;

    const content = _.get(usedIndex[virtualRowIndex].split(' '), data);

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

  const currentRowIndexes = [];

  return {
    config: historyConfig,
    rows,
    rowCount,
    totalRowCount,
    currentRowIndexes,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  addEntryPoint: (entryPoint) => {
    dispatch(addEntryPoint(viewId, entryPoint));
  },
});

const HistoryViewContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default HistoryViewContainer;
