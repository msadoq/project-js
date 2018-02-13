import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getInspectorOptions } from 'viewManager/GroundAlarmView/store/selectors';
import { getAlarmDomain, getAlarmTimeline, getAlarmMode, getSearch, getEnableSearch } from 'viewManager/OnboardAlarmView/store/configurationReducer';
import { getIsPlaying } from 'store/reducers/hsc';
import { getDataRows } from 'viewManager/OnboardAlarmView/store/selectors';
import { getSelectedAlarms, getSort, getExpandedAlarms } from 'viewManager/GroundAlarmView/store/uiReducer';
import {
  collapseAlarm,
  uncollapseAlarm,
  toggleSelection,
  toggleSort,
  inputToggle,
  inputSearch,
  inputResetAll,
} from 'viewManager/GroundAlarmView/store/actions';
import { openAckModal } from 'viewManager/OnboardAlarmView/store/actions';
import { getData } from 'viewManager/OnboardAlarmView/store/dataReducer';
import OnboardAlarmTable from './OnboardAlarmTable';

const mapStateToProps = createStructuredSelector({
  sort: getSort,
  mode: getAlarmMode,
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  rows: getDataRows,
  expandedAlarms: getExpandedAlarms,
  selectedAlarms: getSelectedAlarms,
  indexedRows: _.compose(_.prop('lines'), getData),
  inspectorOptions: getInspectorOptions,
  isPlayingTimebar: getIsPlaying,
  search: getSearch,
  enableSearch: getEnableSearch,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  openAckModal: selectedAlarms => dispatch(openAckModal(viewId, selectedAlarms)),
  collapse: oid => dispatch(collapseAlarm(viewId, oid)),
  uncollapse: oid => dispatch(uncollapseAlarm(viewId, oid)),
  toggleSelection: oid => dispatch(toggleSelection(viewId, oid)),
  toggleSort: column => dispatch(toggleSort(viewId, column)),
  inputSearch: (column, value) => dispatch(inputSearch(viewId, column, value)),
  inputResetAll: () => dispatch(inputResetAll(viewId)),
  inputToggle: () => dispatch(inputToggle(viewId)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  openInspector: (parameterName) => {
    const inspectorOptions = _.set(['dataId', 'parameterName'], parameterName, stateProps.inspectorOptions);
    return ownProps.openInspector(inspectorOptions);
  },
});

const OnboardAlarmTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(OnboardAlarmTable);

OnboardAlarmTableContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default OnboardAlarmTableContainer;
