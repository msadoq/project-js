import { connect } from 'react-redux';
import { updateTimebarId } from '../../store/actions/pages';
import { createNewTimebar } from '../../store/actions/timebars';
import SelectTimebar from './SelectTimebar';

export default connect(
  () => ({}),
  {
    updateTimebarId,
    createNewTimebar,
  }
)(SelectTimebar);
