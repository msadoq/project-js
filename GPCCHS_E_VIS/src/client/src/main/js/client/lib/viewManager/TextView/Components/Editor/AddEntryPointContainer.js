// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView. Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y axis.
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import {
  addEntryPoint,
} from '../../../../store/actions/views';
import AddEntryPointWrapper from './AddEntryPointWrapper';

export default connect(
  null,
  { addEntryPoint }
)(AddEntryPointWrapper);
