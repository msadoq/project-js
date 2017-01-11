const { v4 } = require('node-uuid');
const {
  ifElse, isNil, identity, map, over, lensProp, compose,
  assoc, prop, mergeAll, values, always, is, indexBy,
} = require('ramda');

const safeMap = f => ifElse(isNil, identity, map(f));
const overTimelines = over(lensProp('timelines'));
const editTimelines = compose(safeMap, overTimelines, safeMap);

const newUUID = v4;
const injectTimelinesUUID = timeline => assoc('uuid', newUUID(), timeline);
const injectAllTimelinesUUID = editTimelines(injectTimelinesUUID);
const keepOnlyUUID = editTimelines(prop('uuid'));

const indexByUUID = ifElse(is(Array), indexBy(prop('uuid')), always({}));
const indexTimelines = compose(indexByUUID, prop('timelines'));
const indexAllTimelines = compose(mergeAll, values, safeMap(indexTimelines));

/**
 * Find timelines in each .timebars
 * Store each with a uuid in .timelines
 * Then replace timeline object in .timebars with uuid
 *
 * @param content
 * @param cb
 * @returns {*}
 */
module.exports = (content, cb) => {
  const timebars = prop('timebars', content);
  const timebarsWithUUID = injectAllTimelinesUUID(timebars);

  return cb(null, {
    ...content,
    timelines: indexAllTimelines(timebarsWithUUID),
    timebars: keepOnlyUUID(timebarsWithUUID),
  });
};
