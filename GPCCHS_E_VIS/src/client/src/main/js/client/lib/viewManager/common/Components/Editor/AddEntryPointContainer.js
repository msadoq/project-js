// ====================================================================
// HISTORY
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  TextView common components to dedicated folder
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
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
