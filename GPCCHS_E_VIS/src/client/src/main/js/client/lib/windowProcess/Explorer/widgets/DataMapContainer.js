import { connect } from 'react-redux';
import mapGenerator from '../../../dataManager/map';
import DataMap from './DataMap';

const mapStateToProps = state => ({
  map: mapGenerator(state),
});

const DataMapContainer = connect(mapStateToProps)(DataMap);

export default DataMapContainer;
