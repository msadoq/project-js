/* eslint-disable quote-props,no-unused-vars */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getData, getConfiguration } from 'viewManager/HistoryView/store/dataReducer';
import { addEntryPoint } from 'store/actions/views';
import { toggleColumnSort, filterColumn, scrollRows } from 'store/actions/tableColumns';
import formatData from '../../data/formatData';
import HistoryView from './HistoryView';
import { askUnit } from '../../../../store/actions/catalogs';
import { getSessionByTimelineId } from '../../../../store/reducers/sessions';


const mapStateToProps = (state, { viewId }) => {
  const config = getConfiguration(state, { viewId });
  const data = getData(state, { viewId });
  const formattedData = formatData(data, config);

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
  onFilter: (col, value) => {
    dispatch(filterColumn(viewId, col, value));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, col, mode));
  },
  onScroll: (offset) => {
    dispatch(scrollRows(viewId, offset));
  },
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
