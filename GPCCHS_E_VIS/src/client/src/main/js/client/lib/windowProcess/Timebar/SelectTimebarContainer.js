import { connect } from 'react-redux';
import { mountPageTimebar } from 'store/actions/pages';
import { createNewTimebar } from 'store/actions/timebars';
import SelectTimebar from './SelectTimebar';

export default connect(
  () => ({}),
  {
    mountPageTimebar,
    createNewTimebar,
  }
)(SelectTimebar);
