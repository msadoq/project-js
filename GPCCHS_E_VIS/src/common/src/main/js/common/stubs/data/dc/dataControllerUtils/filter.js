const globalConstants = require('../../../../constants');
const applyOverride = require('../../applyOverride');

const getFilter = override => applyOverride({
  fieldName: 'extractedValue',
  type: globalConstants.FILTERTYPE_GT,
  fieldValue: 42,
}, override);

module.exports = {
  getFilter,
};
