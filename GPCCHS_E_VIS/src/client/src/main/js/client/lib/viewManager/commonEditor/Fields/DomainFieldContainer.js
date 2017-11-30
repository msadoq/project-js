import { connect } from 'react-redux';
import DomainField from './DomainField';
import { getDomains } from '../../../store/reducers/domains';

const mapStateToProps = state => ({
  domains: getDomains(state),
});

const DomainFieldContainer = connect(mapStateToProps, {})(DomainField);

export default DomainFieldContainer;
