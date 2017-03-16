import { connect } from 'react-redux';
import Store from './Store';

const mapStateToProps = state => ({ state });

const StoreContainer = connect(mapStateToProps)(Store);

export default StoreContainer;
