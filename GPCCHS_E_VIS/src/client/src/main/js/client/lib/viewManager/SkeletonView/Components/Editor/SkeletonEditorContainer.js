// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Add basic SkeletonView . .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import SkeletonEditor from './SkeletonEditor';

const SkeletonViewContainer = connect()(SkeletonEditor);

export default SkeletonViewContainer;
