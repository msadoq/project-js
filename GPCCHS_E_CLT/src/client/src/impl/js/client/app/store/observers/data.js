import * as constants from '../../constants';
import debug from '../../utils/mainDebug';
import { getStatus as getAppStatus } from '../selectors/hsc';

const logger = debug('store:observers:data');

export default function data(state, dispatch, previousState) {
  if (getAppStatus(state) !== constants.LIFECYCLE_STARTED) {
    return undefined;
  }

  return console.log('welcome in data');
}
