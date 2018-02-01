import _ from 'lodash/fp';

export default (state = {}, action) => {
  if (action.type === 'DEBUG_SAVE_CACHE') {
    const getCollections = _.pipe(
      _.values,
      _.indexBy('name'),
      _.mapValues(_.prop('data'))
    );
    return getCollections(action.payload);
  }
  return state;
};

export const getSavedCache = _.propOr({}, 'cache');
