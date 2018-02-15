import _fp from 'lodash/fp';

exports.applyDefaultValues = (source, defaultValues) => _fp.defaultsDeep(defaultValues, source);
