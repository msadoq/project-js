import { connect } from 'react-redux';
import { getDomains } from 'store/reducers/domains';
import DomainField from './DomainField';

const mapStateToProps = state => ({
  domains: getDomains(state),
});

const DomainFieldContainer = connect(mapStateToProps, {})(DomainField);

export default DomainFieldContainer;
