import { v4 } from 'uuid';

import _ from 'lodash/fp';

import validation from './validation';

const editTimelines = _.compose(_.mapValues, _.update('timelines'), _.map);

const newUUID = v4;
const injectTimelinesUUID = timeline => _.assoc('uuid', newUUID(), timeline);
const injectAllTimelinesUUID = editTimelines(injectTimelinesUUID);
const keepOnlyUUID = editTimelines(_.prop('uuid'));

const indexByUUID = tls => (_.isArray(tls) ? _.indexBy('uuid', tls) : {});
const indexTimelines = _.compose(indexByUUID, _.prop('timelines'));
const indexAllTimelines = _.compose(_.mergeAll, _.values, _.map(indexTimelines));

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
  const timebars = _.prop('timebars', content);
  const timebarsWithUUID = injectAllTimelinesUUID(timebars);

  const validationError = validation('timebars', _.values(timebars));
  if (validationError) {
    return cb(validationError);
  }

  return cb(null, {
    ...content,
    timelines: indexAllTimelines(timebarsWithUUID),
    timebars: keepOnlyUUID(timebarsWithUUID),
  });
};
