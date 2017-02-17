import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerView from './PerView';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getViews } from '../../../store/selectors/views';
import { getCount } from '../../../store/selectors/viewData';
import dataMapGenerator from '../../../dataManager/map';
import { updateExplorerFlag } from '../../../store/actions/windows';
import { getExplorerFlag } from '../../../store/selectors/windows';

const mapStateToProps = (state, { windowId }) => {
  const dataMap = dataMapGenerator(state);

  return {
    sessions: getSessions(state),
    domains: getDomains(state),
    count: getCount(state),
    perView: dataMap.perView,
    views: getViews(state),
    windowId,
    dataId: getExplorerFlag(state, windowId, 'viewTabDataId'),
    localId: getExplorerFlag(state, windowId, 'viewTabLocalId'),
    domainAndSession: getExplorerFlag(state, windowId, 'viewTabDomain'),
    remoteId: getExplorerFlag(state, windowId, 'viewTabRemoteId'),
    filters: getExplorerFlag(state, windowId, 'viewTabFilters'),
  };
};

const PerViewContainer = connect(mapStateToProps, { updateExplorerFlag })(PerView);

export default PerViewContainer;

PerViewContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};
