import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerRemoteId from './PerRemoteId';
import { getTimebars } from '../../../store/selectors/timebars';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getViews } from '../../../store/selectors/views';
import { getPerRemoteIdMap } from '../../../dataManager/map';
import { updateExplorerFlag } from '../../../store/actions/windows';
import { getExplorerFlag } from '../../../store/selectors/windows';

const mapStateToProps = (state, { windowId }) =>
  ({
    timebars: getTimebars(state),
    sessions: getSessions(state),
    domains: getDomains(state),
    views: getViews(state),
    perRemoteId: getPerRemoteIdMap(state),
    dataId: getExplorerFlag(state, { windowId, flagName: 'dataTabDataId' }),
    localId: getExplorerFlag(state, { windowId, flagName: 'dataTabLocalId' }),
    domainAndSession: getExplorerFlag(state, { windowId, flagName: 'dataTabDomain' }),
    usingViews: getExplorerFlag(state, { windowId, flagName: 'dataTabViews' }),
    filters: getExplorerFlag(state, { windowId, flagName: 'dataTabFilters' }),
  });

const PerRemoteIdContainer = connect(mapStateToProps, { updateExplorerFlag })(PerRemoteId);

PerRemoteIdContainer.props = {
  windowId: PropTypes.string.isRequired,
};

export default PerRemoteIdContainer;
