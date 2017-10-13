import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import DomainFilter from './DomainFilter';
import { getAlarmDomain } from '../../../store/configurationReducer';
import * as actions from '../../../store/actions';
import { getDomains } from '../../../../../store/reducers/domains';

const mapStateToProps = createStructuredSelector({
  domain: getAlarmDomain,
  availableDomains: getDomains,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  updateDomain: domain => dispatch(actions.updateAlarmDomain(viewId, domain)),
});

const DomainFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainFilter);

DomainFilterContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default DomainFilterContainer;
