import compose from 'lodash/fp/compose';
import pipe from 'lodash/fp/pipe';
import prop from 'lodash/fp/prop';
import path from 'lodash/fp/path';
import assoc from 'lodash/fp/assoc';
import isArray from 'lodash/fp/isArray';
import map from 'lodash/fp/map';
import indexBy from 'lodash/fp/indexBy';

import { v4 } from 'node-uuid';

// not pure (due to uuid generation)
const setUUID = obj => assoc('uuid', v4(), obj);
const indexByUUID = compose(indexBy(prop('uuid')), map(setUUID));
const getTimebarsWithUUID = pipe(
  path(['__original', 'timebars']),
  tbs => (isArray(tbs) ? indexByUUID(tbs) : {}),
);

/**
 * Add indexed timebars with freshly generated uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
export default (content, cb) => cb(null, {
  ...content,
  timebars: getTimebarsWithUUID(content)
});
