import { connect } from 'react-redux';
import { updateTimebarId } from '../../store/actions/pages';
import { add } from '../../store/actions/timebars';
import SelectTimebar from './SelectTimebar';

export default connect(
  () => ({}),
  {
    updateTimebarId,
    addTimebar: add,
  }
)(SelectTimebar);
