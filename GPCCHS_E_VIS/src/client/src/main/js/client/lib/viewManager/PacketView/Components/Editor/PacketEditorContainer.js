// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import PacketEditor from './PacketEditor';

const PacketViewContainer = connect()(PacketEditor);

export default PacketViewContainer;
