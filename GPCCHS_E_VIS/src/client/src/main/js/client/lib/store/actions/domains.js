import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export default {
  updateDomains: simple(types.HSS_UPDATE_DOMAINS, 'domains'),
};
