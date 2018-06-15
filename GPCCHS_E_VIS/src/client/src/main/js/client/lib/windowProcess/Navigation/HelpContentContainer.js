// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store
//  folder in mainProcess
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { openWikiHelper } from 'store/actions/ui';

import HelpContent from './HelpContent';

const mapDispatchToProps = {
  openWikiHelper,
};

export default connect(null, mapDispatchToProps)(HelpContent);
