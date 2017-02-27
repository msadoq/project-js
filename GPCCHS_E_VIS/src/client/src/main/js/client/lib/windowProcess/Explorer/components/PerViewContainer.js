import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerView from './PerView';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getViews } from '../../../store/selectors/views';
import { getCount } from '../../../store/selectors/viewData';
import { getPerViewMap } from '../../../dataManager/map';
import { updateExplorerFlag } from '../../../store/actions/windows';
import { getExplorerFlag } from '../../../store/selectors/windows';

const mapStateToProps = (state, { windowId }) =>
  ({
    sessions: getSessions(state),
    domains: getDomains(state),
    count: getCount(state),
    perView: getPerViewMap(state),
    views: getViews(state),
    windowId,
    dataId: getExplorerFlag(state, { windowId, flagName: 'viewTabDataId' }),
    localId: getExplorerFlag(state, { windowId, flagName: 'viewTabLocalId' }),
    remoteId: getExplorerFlag(state, { windowId, flagName: 'viewTabRemoteId' }),
    domainAndSession: getExplorerFlag(state, { windowId, flagName: 'viewTabDomain' }),
    filters: getExplorerFlag(state, { windowId, flagName: 'viewTabFilters' }),
  });

const PerViewContainer = connect(mapStateToProps, { updateExplorerFlag })(PerView);

export default PerViewContainer;

PerViewContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};
