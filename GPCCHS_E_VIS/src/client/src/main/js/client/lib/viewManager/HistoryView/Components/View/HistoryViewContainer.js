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

import { getData, getConfiguration } from 'viewManager/HistoryView/store/dataReducer';
import { addEntryPoint } from 'store/actions/views';
import { toggleColumnSort, filterColumn, scrollRows } from 'store/actions/tableColumns';
import HistoryView from './HistoryView';
import { getSessionByTimelineId } from '../../../../store/reducers/sessions';
import { formatHistoryRows } from '../../data';
import formatData from '../../data/formatData';


const mapStateToProps = (state, { viewId }) => {
  const config = getConfiguration(state, { viewId });
  const data = getData(state, { viewId });

  const reducedConfig = {
    ...config.tables.history,
    entryPoints: config.entryPoints,
  };

  const preformattedData = formatData(data, reducedConfig);
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

  return {
    config: updatedConfig,
    data: formattedData,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  addEntryPoint: (entryPoint) => {
    dispatch(addEntryPoint(viewId, entryPoint));
  },
  askUnit: (domainId, sessionId, name, itemName) => {
    // TODO: uncomment this and use askUnitSimple from 2.0.0.2 patch
    // dispatch(askUnit(domainId, sessionId, name, itemName));
  },
});

const HistoryViewContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default HistoryViewContainer;
