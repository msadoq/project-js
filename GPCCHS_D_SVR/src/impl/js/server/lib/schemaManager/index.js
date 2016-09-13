// Schema validator module
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

// Get schema in other file.json
const schemaWS = require('./schemas/WS.schema.json');
const schemaTV = require('./schemas/TV.schema.json');
const schemaTB = require('./schemas/timeBarSchema.json');
const schemaPV = require('./schemas/PV.schema.json');
const schemaPG = require('./schemas/PG.schema.json');

// Apply Schema
const validateWS = ajv.compile(schemaWS);
const validateTV = ajv.compile(schemaTV);
const validateTB = ajv.compile(schemaTB);
const validatePV = ajv.compile(schemaPV);
const validatePG = ajv.compile(schemaPG);

const validateJson = (data, validFct) => {
  let errors;
  if (typeof data !== 'object' || !Object.keys(data).length) {
    errors = 'Empty file';
  } else if (!validFct(data)) {
    // Save errors in returned value
    errors = validFct.errors;
  }
  return errors;
};

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
