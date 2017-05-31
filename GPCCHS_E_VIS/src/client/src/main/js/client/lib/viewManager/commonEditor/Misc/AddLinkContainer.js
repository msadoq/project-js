import { connect } from 'react-redux';
import { addLink } from '../../../store/actions/views';
import AddLinkWrapper from './AddLinkWrapper';

export default connect(
  null,
  { addLink }
)(AddLinkWrapper);
