import _ from 'lodash/fp';

// utilities
const copyProp = _.curry((keyFrom, keyTo, obj) => {
  const value = _.get(keyFrom, obj);
  return value ? _.set(keyTo, value, obj) : obj;
});

// domain
const keepFirstEntryPoint = _.pipe(
  copyProp('entryPoints[0]', 'entryPoint'),
  _.unset('entryPoints')
);

export default _.pipe(
  keepFirstEntryPoint
);
