/* eslint-disable quote-props,no-unused-vars */
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

import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getConfigurationByViewId } from 'viewManager';
import { getData } from 'viewManager/HistoryView/store/dataReducer';
import { addEntryPoint } from 'store/actions/views';
import { toggleColumnSort, filterColumn, scrollRows } from 'store/actions/tableColumns';
import HistoryView from './HistoryView';
import { getSessionByTimelineId } from '../../../../store/reducers/sessions';
import { formatHistoryRows } from '../../data';
import formatData from '../../data/formatData';


const mapStateToProps = (state, { viewId }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const data = getData(state, { viewId });

  const reducedConfig = {
    ...config.tables.history,
    entryPoints: config.entryPoints,
  };

  const { data: preformattedData, currentLines } = formatData(data, reducedConfig);
  const formattedData = formatHistoryRows(preformattedData, reducedConfig);

  const entryPointReducer = (acc, entryPoint) => {
    if (entryPoint.connectedData && entryPoint.connectedData.timeline) {
      const {
        domain,
        catalog,
        catalogItem,
        timeline,
      } = entryPoint.connectedData;

      const session =
        getSessionByTimelineId(
          state,
          {
            timelineId: timeline,
          }
        );

      const sessionId = session.id;

      const unit = _.get(
        state.catalogs,
        [
          `${domain}-${session.id}`,
          catalog,
          catalogItem,
        ]
      );

      return [
        ...acc,
        {
          ...entryPoint,
          connectedData: {
            ...entryPoint.connectedData,
            sessionId,
            unit,
          },
        },
      ];
    }

    return [...acc, entryPoint];
  };

  const updatedConfig = {
    ...config,
    entryPoints: config.entryPoints.reduce(entryPointReducer, []),
  };

  // current rows
  const historyConfig = config.tables.history;

  const _getFieldIndex = field => historyConfig.cols.findIndex(col => col.title === field);

  const referenceTimestampIndex = _getFieldIndex('referenceTimestamp');
  const epNameIndex = _getFieldIndex('epName');

  const _isCurrent = row => currentLines.some(
    line =>
      line.epName === row[epNameIndex].value &&
      line.timestamp === String((new Date(row[referenceTimestampIndex].value)).getTime())
  );

  const currentRowIndexes = formattedData.rows.reduce((acc, cur, index) => {
    if (_isCurrent(cur)) {
      return [...acc, index];
    }

    return acc;
  }, []);

  return {
    config: updatedConfig,
    data: formattedData,
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
