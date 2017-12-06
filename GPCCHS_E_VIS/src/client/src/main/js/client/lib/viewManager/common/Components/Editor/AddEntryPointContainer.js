import { connect } from 'react-redux';
import {
  addEntryPoint,
} from 'store/actions/views';
import AddEntryPointWrapper from './AddEntryPointWrapper';

export default connect(
  null,
  { addEntryPoint }
)(AddEntryPointWrapper);
