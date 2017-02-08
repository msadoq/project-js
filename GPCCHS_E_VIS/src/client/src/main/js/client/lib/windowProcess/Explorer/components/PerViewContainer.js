import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PerView from './PerView';
import { getSessions } from '../../../store/selectors/sessions';
import { getDomains } from '../../../store/selectors/domains';
import { getCount } from '../../../store/selectors/viewData';

const mapStateToProps = (state) => {
  const sessions = getSessions(state);
  const domains = getDomains(state);
  const count = getCount(state);

  return {
    sessions,
    domains,
    count,
  };
};

const PerViewContainer = connect(mapStateToProps)(PerView);

PerViewContainer.propTypes = {
  perView: PropTypes.object.isRequired,
  parseFormula: PropTypes.func.isRequired,
  views: PropTypes.object.isRequired,
};

export default PerViewContainer;
