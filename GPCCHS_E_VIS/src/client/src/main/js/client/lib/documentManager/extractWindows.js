import _ from 'lodash/fp';

import { v4 } from 'uuid';

// not pure (due to uuid generation)
const setUUID = obj => _.assoc('uuid', v4(), obj);
const otherwise = () => true;
const indexWindows = _.cond([
  [_.isArray, _.compose(_.indexBy(_.prop('uuid')), _.map(setUUID))],
  [otherwise, _.always({})],
]);
const supportedWindowTypes = [
  'documentWindow',
];
const filterByTypes = _.filter(_.compose(_.contains(_.__, supportedWindowTypes), _.prop('type')));

const getWindows = _.compose(indexWindows, filterByTypes, _.path('__original.windows'));

/**
 * Add indexed windows with freshly generated uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
export default (content, cb) => cb(null, {
  ...content,
  windows: getWindows(content),
});
