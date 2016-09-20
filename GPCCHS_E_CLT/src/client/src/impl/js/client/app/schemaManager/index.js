// Schema validator module
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

// Get schema in other file.json
const schemaWS = require('./schemas/WS.schema.json');
const schemaTV = require('./schemas/TV.schema.json');
const schemaTB = require('./schemas/timeBarSchema.json');
const schemaPV = require('./schemas/PV.schema.json');
const schemaPG = require('./schemas/PG.schema.json');
const schemaMV = require('./schemas/MV.schema.json');


// Apply Schema
const validateWS = ajv.compile(schemaWS);
const validateTV = ajv.compile(schemaTV);
const validateTB = ajv.compile(schemaTB);
const validatePV = ajv.compile(schemaPV);
const validatePG = ajv.compile(schemaPG);
const validateMV = ajv.compile(schemaMV);

const knownValidators = {
  PlotView: validatePV,
  TextView: validateTV,
  MimicView: validateMV,
  Page: validatePG,
  Workspace: validateWS,
  Timebar: validateTB,
};


const validateJson = (id, data, schema) => {
  if (!knownValidators[id]) {
    if (!schema) {
      // throw new Error('Error validate(): Unknown validator');
      return 'Error validate(): Unknown validator';
    }
    knownValidators[id] = ajv.compile(schema);
  }
  let errors;
  if (typeof data !== 'object' || !Object.keys(data).length) {
    errors = 'Empty file';
  } else if (!knownValidators[id](data)) {
    // Save errors in returned value
    errors = knownValidators[id].errors;
  }
  return errors;
};

// Function export
module.exports = (...args) => {
  let id;
  let data;
  let schema;
  if (args.length === 2) {
    id = args[0];
    data = args[1];
  } else if (args.length === 3) {
    id = args[0];
    data = args[1];
    schema = args[2];
  } else {
    return 'Error validate(): 2 or 3 arguments expected';
  }
  return validateJson(id, data, schema);
};
