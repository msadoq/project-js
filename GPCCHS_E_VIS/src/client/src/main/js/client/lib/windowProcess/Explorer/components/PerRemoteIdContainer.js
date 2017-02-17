import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerRemoteId from './PerRemoteId';
import { getTimebars } from '../../../store/selectors/timebars';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getViews } from '../../../store/selectors/views';
import dataMapGenerator from '../../../dataManager/map';
import { updateExplorerFlag } from '../../../store/actions/windows';
import { getExplorerFlag } from '../../../store/selectors/windows';

const mapStateToProps = (state, { windowId }) => {
  const dataMap = dataMapGenerator(state);

  return {
    timebars: getTimebars(state),
    sessions: getSessions(state),
    domains: getDomains(state),
    views: getViews(state),
    perRemoteId: dataMap.perRemoteId,
    dataId: getExplorerFlag(state, { windowId, flagName: 'dataTabDataId' }),
    localId: getExplorerFlag(state, { windowId, flagName: 'dataTabLocalId' }),
    domainAndSession: getExplorerFlag(state, { windowId, flagName: 'dataTabDomain' }),
    usingViews: getExplorerFlag(state, { windowId, flagName: 'dataTabViews' }),
    filters: getExplorerFlag(state, { windowId, flagName: 'dataTabFilters' }),
  };
};

const PerRemoteIdContainer = connect(mapStateToProps, { updateExplorerFlag })(PerRemoteId);

PerRemoteIdContainer.props = {
  windowId: PropTypes.string.isRequired,
};

export default PerRemoteIdContainer;
