import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import zipObject from 'lodash/fp/zipObject';

const documentTypes = [
  'Workspace',
  'Page',
  'TextView',
  'PlotView',
  'MimicView',
  'PacketView',
  'HistoryView',
];

const append = appendedStr => str => `${str}${appendedStr}`;

/**
 * Take an array of documentType and return an object with documentType as key,
 * and mimeType as value.
 * A mimeType is just a documentType with a 'Doc' string appended
 *
 * @example
 * createMimeTypes(['aaa', 'bbb', 'ccc'])
 * // -> { aaa: 'aaaDoc', bbb: 'bbbDoc', ccc: 'cccDoc' }
 *
 * @arg {string[]} documentTypes
 * @return {Object} mimeTypes
 * [documentType] => { documentType: mimeType }
*/
const createMimeTypes = pipe(map(append('Doc')), zipObject(documentTypes));

module.exports = createMimeTypes(documentTypes);
