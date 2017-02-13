import { connect } from 'react-redux';
import { getHealthMapForWindow } from '../../store/selectors/health';

import Health from './Health';

export default connect(getHealthMapForWindow)(Health);
