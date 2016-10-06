/**
 * Generate a predictable localId part for a given type, field and offset
 *
 * @param type string
 * @param field string
 * @param timebarId number
 * @param offset number
 * @return string
 */
module.exports = (type, field, timebarId, offset) => `${type}.${field}.${timebarId}:${offset}`;
