import { connect } from 'react-redux';
import PerView from './PerView';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getViews } from '../../../store/selectors/views';
import { getCount } from '../../../store/selectors/viewData';
import dataMapGenerator from '../../../dataManager/map';

const mapStateToProps = (state) => {
  const dataMap = dataMapGenerator(state);

  return {
    sessions: getSessions(state),
    domains: getDomains(state),
    count: getCount(state),
    perView: dataMap.perView,
    views: getViews(state),
  };
};

const PerViewContainer = connect(mapStateToProps)(PerView);

export default PerViewContainer;
