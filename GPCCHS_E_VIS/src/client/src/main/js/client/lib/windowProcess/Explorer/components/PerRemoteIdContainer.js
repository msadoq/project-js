import { connect } from 'react-redux';
import PerRemoteId from './PerRemoteId';
import { getTimebars } from '../../../store/selectors/timebars';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getViews } from '../../../store/selectors/views';
import dataMapGenerator from '../../../dataManager/map';

const mapStateToProps = (state) => {
  const dataMap = dataMapGenerator(state);

  return {
    timebars: getTimebars(state),
    sessions: getSessions(state),
    domains: getDomains(state),
    views: getViews(state),
    perRemoteId: dataMap.perRemoteId,
  };
};

const PerRemoteIdContainer = connect(mapStateToProps)(PerRemoteId);

export default PerRemoteIdContainer;
