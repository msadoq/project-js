// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 18/05/2017 : Fix Add new EP in mimicview
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import {
  addEntryPoint,
} from 'store/actions/views';
import AddEntryPointWrapper from './AddEntryPointWrapper';

export default connect(
  null,
  { addEntryPoint }
)(AddEntryPointWrapper);
