// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { addLink } from 'store/actions/views';
import AddLinkWrapper from './AddLinkWrapper';

export default connect(
  null,
  { addLink }
)(AddLinkWrapper);
