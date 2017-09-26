// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { openWikiHelper } from '../../store/actions/ui';

import HelpContent from './HelpContent';

const mapDispatchToProps = {
  openWikiHelper,
};

export default connect(null, mapDispatchToProps)(HelpContent);
