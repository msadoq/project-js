// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_TIMEBAR_ADD by WS_TIMEBAR_CREATE_NEW .
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { mountPageTimebar } from '../../store/actions/pages';
import { createNewTimebar } from '../../store/actions/timebars';
import SelectTimebar from './SelectTimebar';

export default connect(
  () => ({}),
  {
    mountPageTimebar,
    createNewTimebar,
  }
)(SelectTimebar);
