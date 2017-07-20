import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export default {
  askOpenLink: simple(types.WS_ASK_OPEN_LINK, 'viewId', 'linkId'),
};
