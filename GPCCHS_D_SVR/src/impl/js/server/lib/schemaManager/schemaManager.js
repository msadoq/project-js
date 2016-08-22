// Schema validator module
const Ajv = require('ajv');

const ajv = Ajv({allErrors: true});

// Get schema in other file.json
const schemaWS = require('./WS.schema');
const schemaTV = require('./TV.schema');
const schemaTB = require('./timeBarSchema');
const schemaPV = require('./PV.schema');
const schemaPG = require('./PG.schema');


// Apply Schema
const validateWS = ajv.compile(schemaWS);
const validateTV = ajv.compile(schemaTV);
const validateTB = ajv.compile(schemaTB);
const validatePV = ajv.compile(schemaPV);
const validatePG = ajv.compile(schemaPG);

// Compliance between schema and data
// Workspace
function validateWsJson(data) {
  let errors;
  if (!validateWS(data)) {
    // let str = ajv.errorsText(validate.errors, { separator: '\n' });
    // Save errors in returned value
    errors = validateWS.errors;
  }
  return errors;
}

// TextView
function validateTvJson(data) {
  let errors;
  if (!validateTV(data)) {
    // Save errors in returned value
    errors = validateTV.errors;
  }
  return errors;
}
// TimeBar
function validateTbJson(data) {
  let errors;
  if (!validateTB(data)) {
    // Save errors in returned value
    errors = validateTB.errors;
  }
  return errors;
}
// PlotView
function validatePvJson(data) {
  let errors;
  if (!validatePV(data)) {
    // Save errors in returned value
    errors = validatePV.errors;
  }
  return errors;
}
// Workspace
function validatePgJson(data) {
  let errors;
  if (!validatePG(data)) {
    // Save errors in returned value
    errors = validatePG.errors;
  }
  return errors;
}

// Function export
module.exports = { validateWsJson, validateTvJson, validateTbJson, validatePvJson, validatePgJson };
