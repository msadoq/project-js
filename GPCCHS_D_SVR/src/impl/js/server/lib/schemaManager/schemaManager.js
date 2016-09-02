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
var validateJson = (data,validFct) => {
  let errors;
  if (data.length == 0)  {
    errors = "Empty file";
  } else if (!validFct(data)) {
//    console.log(ajv.errorsText(validFct.errors, { separator: '\n' }));
    // Save errors in returned value
    errors = validFct.errors;
  }
  return errors;
}
// Workspace
function validateWsJson(data) {
  return validateJson(data, validateWS);
}

// TextView
function validateTvJson(data) {
  return validateJson(data, validateTV);
}
// TimeBar
function validateTbJson(data) {
  return validateJson(data, validateTB);
}
// PlotView
function validatePvJson(data) {
  return validateJson(data, validatePV);
}
// Workspace
function validatePgJson(data) {
  return validateJson(data, validatePG);
}

// Function export
module.exports = { validateWsJson, validateTvJson, validateTbJson, validatePvJson, validatePgJson };
