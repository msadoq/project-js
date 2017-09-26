// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import mapGenerator from '../../../dataManager/map';
import DataMap from './DataMap';

const mapStateToProps = state => ({
  map: mapGenerator(state),
});

const DataMapContainer = connect(mapStateToProps)(DataMap);

export default DataMapContainer;
