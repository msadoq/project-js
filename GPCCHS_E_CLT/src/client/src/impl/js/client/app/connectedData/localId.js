const _ = require('lodash');

/**
 * Generate a predictable localId part for a given type, field and offset
 *
 * @param type string
 * @param field string
 * @param offset number
 * @return string
 */
module.exports = (type, field, offset) => `${type}.${field}.${offset}`;
