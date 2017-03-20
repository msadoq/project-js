import { connect } from 'react-redux';
import { getAll } from 'common/parameters';
import { getMasterSession } from '../../../store/selectors/masterSession';
import Information from './Information';

const mapStateToProps = state => ({
  masterSession: getMasterSession(state),
  configuration: getAll(),
});

const InformationContainer = connect(mapStateToProps)(Information);

export default InformationContainer;
