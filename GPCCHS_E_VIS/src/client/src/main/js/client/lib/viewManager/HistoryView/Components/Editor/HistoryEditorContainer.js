// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import HistoryEditor from './HistoryEditor';

const HistoryViewContainer = connect()(HistoryEditor);

export default HistoryViewContainer;
