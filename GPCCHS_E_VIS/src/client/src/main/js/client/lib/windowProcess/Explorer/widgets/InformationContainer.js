// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Add information widget in explorer with masterSession and configuration
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add information widget in explorer with masterSession and configuration
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Change 'configuration' prop by 'parameters' in InformationContainer
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAll } from '../../../common/configurationManager';
import { getMasterSession } from './InformationSelectors';
import Information from './Information';

const mapStateToProps = createStructuredSelector({
  masterSession: getMasterSession,
  parameters: () => getAll(),
});

const InformationContainer = connect(mapStateToProps)(Information);

export default InformationContainer;
