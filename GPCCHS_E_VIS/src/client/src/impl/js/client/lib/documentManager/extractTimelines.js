import { v4 } from 'node-uuid';

import update from 'lodash/fp/update';
import isArray from 'lodash/fp/isArray';
import indexBy from 'lodash/fp/indexBy';
import mergeAll from 'lodash/fp/mergeAll';
import map from 'lodash/fp/map';
import mapValues from 'lodash/fp/mapValues';
import compose from 'lodash/fp/compose';
import assoc from 'lodash/fp/assoc';
import prop from 'lodash/fp/prop';
import values from 'lodash/fp/values';

import validation from './validation';

const editTimelines = compose(mapValues, update('timelines'), map);

const newUUID = v4;
const injectTimelinesUUID = timeline => assoc('uuid', newUUID(), timeline);
const injectAllTimelinesUUID = editTimelines(injectTimelinesUUID);
const keepOnlyUUID = editTimelines(prop('uuid'));

const indexByUUID = tls => (isArray(tls) ? indexBy('uuid', tls) : {});
const indexTimelines = compose(indexByUUID, prop('timelines'));
const indexAllTimelines = compose(mergeAll, values, map(indexTimelines));

/**
 * Find timelines in each .timebars
 * Store each with a uuid in .timelines
 * Then replace timeline object in .timebars with uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
export default (content, cb) => {
  const timebars = prop('timebars', content);
  const timebarsWithUUID = injectAllTimelinesUUID(timebars);

  const validationError = validation('timebars', values(timebars));
  if (validationError) {
    return cb(validationError);
  }

  return cb(null, {
    ...content,
    timelines: indexAllTimelines(timebarsWithUUID),
    timebars: keepOnlyUUID(timebarsWithUUID),
  });
};
