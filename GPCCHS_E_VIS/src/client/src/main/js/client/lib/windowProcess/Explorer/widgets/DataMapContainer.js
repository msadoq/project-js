// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import mapGenerator from 'dataManager/map';
import DataMap from './DataMap';

const mapStateToProps = state => ({
  map: mapGenerator(state),
});

const DataMapContainer = connect(mapStateToProps)(DataMap);

export default DataMapContainer;
