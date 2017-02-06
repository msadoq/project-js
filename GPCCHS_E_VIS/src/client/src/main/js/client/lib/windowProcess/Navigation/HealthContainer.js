import { connect } from 'react-redux';
import { getHealthMap } from '../../store/selectors/health';

import Health from './Health';

export default connect(getHealthMap)(Health);
