/**
 * Generate a predictable localId part for a given type, field and offset
 *
 * @param field string
 * @param timebarId number
 * @param offset number
 * @return string
 */
module.exports = (field, timebarId, offset) => `${field}.${timebarId}:${offset}`;
