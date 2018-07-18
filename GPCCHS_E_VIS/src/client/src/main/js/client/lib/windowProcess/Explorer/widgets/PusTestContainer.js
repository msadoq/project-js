import { connect } from 'react-redux';
import { initialize, subscribe, unsubscribe, compare, reset } from 'store/actions/pus';
import PusTest from './PusTest';


const mapDispatchToProps = {
  initialize,
  subscribe,
  unsubscribe,
  compare,
  reset,
};

const PusTestContainer = connect(null, mapDispatchToProps)(PusTest);

export default PusTestContainer;
