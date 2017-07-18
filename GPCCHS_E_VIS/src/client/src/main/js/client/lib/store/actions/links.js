import simple from '../helpers/simpleActionCreator';
import * as types from '../types';


export default {
  openLink: simple(types.WS_OPEN_LINK, 'windowId', 'absolutePath'),
};
