import _ from 'lodash/fp';

import { v4 } from 'uuid';

// not pure (due to uuid generation)
const setUUID = obj => _.assoc('uuid', v4(), obj);
const indexByUUID = _.compose(_.indexBy(_.prop('uuid')), _.map(setUUID));
const getTimebarsWithUUID = _.pipe(
  _.path(['__original', 'timebars']),
  tbs => (_.isArray(tbs) ? indexByUUID(tbs) : {})
);

/**
 * Add indexed timebars with freshly generated uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
export default (content, cb) => {
  try {
    const timebars = getTimebarsWithUUID(content);
    return cb(null, {
      ...content,
      timebars,
    });
  } catch (e) {
    return cb(e);
  }
};
