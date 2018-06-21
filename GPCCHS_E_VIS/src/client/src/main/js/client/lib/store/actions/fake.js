import { TEST_ASK_FAKE_DATA } from '../types';
import simple from '../helpers/simpleActionCreator';

export default {
  askFakeData: simple(TEST_ASK_FAKE_DATA, 'viewId', 'tableId', 'format', 'length'),
};
