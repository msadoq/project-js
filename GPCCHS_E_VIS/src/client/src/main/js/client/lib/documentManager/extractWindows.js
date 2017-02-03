import __ from 'lodash/fp/__';
import contains from 'lodash/fp/contains';
import map from 'lodash/fp/map';
import isArray from 'lodash/fp/isArray';
import path from 'lodash/fp/path';
import cond from 'lodash/fp/cond';
import compose from 'lodash/fp/compose';
import always from 'lodash/fp/always';
import prop from 'lodash/fp/prop';
import assoc from 'lodash/fp/assoc';
import filter from 'lodash/fp/filter';
import indexBy from 'lodash/fp/indexBy';

import { v4 } from 'uuid';

// not pure (due to uuid generation)
const setUUID = obj => assoc('uuid', v4(), obj);
const otherwise = () => true;
const indexWindows = cond([
  [isArray, compose(indexBy(prop('uuid')), map(setUUID))],
  [otherwise, always({})],
]);
const supportedWindowTypes = [
  'documentWindow',
];
const filterByTypes = filter(compose(contains(__, supportedWindowTypes), prop('type')));

const getWindows = compose(indexWindows, filterByTypes, path('__original.windows'));

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
