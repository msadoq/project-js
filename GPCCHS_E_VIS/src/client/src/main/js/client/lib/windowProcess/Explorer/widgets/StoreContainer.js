// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import Store from './Store';

const mapStateToProps = state => ({ state });

const StoreContainer = connect(mapStateToProps)(Store);

export default StoreContainer;
