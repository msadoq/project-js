// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { addLink } from 'store/actions/views';
import AddLinkWrapper from './AddLinkWrapper';

export default connect(
  null,
  { addLink }
)(AddLinkWrapper);
