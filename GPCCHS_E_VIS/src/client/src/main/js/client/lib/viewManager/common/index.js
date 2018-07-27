import _unset from 'lodash/unset';
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';
import _memoize from 'lodash/memoize';
import { SIGNIFICANT_VALIDITY_STATE_VALUE } from 'constants';
import { SDB_VALUE_OPTION, TIME_BASED_DATA_OPTION } from '../commonEditor/Fields/DataTypeField';

const constants = require('constants');

const PACKETS_TYPES = constants.PACKETS_TYPES;

export const buildFormula = (catalog, catalogItem, comObject, comObjectField) => {
  let result = '';
  if (catalog) {
    result += catalog;
  }

  if (catalog && catalogItem) {
    result += `.${catalogItem}`;
  }

  if (catalog && catalogItem && comObject) {
    result += `<${comObject}>`;
  }

  if (catalog && catalogItem && comObject && comObjectField) {
    result += `.${comObjectField}`;
  }
  return result;
};

export const buildFormulaForAutocomplete = (catalog, catalogItem, comObject, comObjectField) => {
  let result = '';
  if (catalog) {
    result += catalog;

    if (catalogItem) {
      result += `.${catalogItem}`;

      if (comObject) {
        result += `<${comObject}>`;

        if (comObject === PACKETS_TYPES.REPORTING_PARAMETER) {
          result += '.convertedValue';
          return result;
        } else if (comObject === PACKETS_TYPES.DECOMMUTED_PACKET) {
          return result;
        }

        if (comObjectField) {
          result += `.${comObjectField}`;
        }

        return result;
      }
    }
  }
  return result;
};
/**
 * Handles entry point editor form submission
 * @param values
 * @param updateEntryPoint callback to update the entry point
 * @param viewId
 */
export function handleSubmit(values, updateEntryPoint, viewId) {
  const { dataType } = values.connectedData;
  if (dataType !== SDB_VALUE_OPTION.value) {
    _unset(values.connectedData, 'path');
    _unset(values.connectedData, 'displayMode');
    _unset(values.connectedData, 'algorithm');
    _unset(values.connectedData, 'algoParameters');
  }
  if (dataType !== TIME_BASED_DATA_OPTION.value) {
    _unset(values.connectedData, 'catalogItem');
    _unset(values.connectedData, 'comObject');
    _unset(values.connectedData, 'comObjectField');
    _unset(values.connectedData, 'provider');
    _unset(values.connectedData, 'refTimestamp');
  }
  const { catalog, catalogItem, comObject, comObjectField } = values.connectedData;
  const formula = buildFormula(catalog, catalogItem, comObject, comObjectField);
  updateEntryPoint(viewId, values.id, {
    ...values,
    connectedData: {
      ...values.connectedData,
      formula,
    },
  });
}

/**
 * given an array of required fields, returns the validate function
 * @param requiredFields
 * @returns a redux-form validate function
 */
const innerValidateRequiredFields = requiredFields => (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export const validateRequiredFields = (requiredFields, values) => (
  values
    ? innerValidateRequiredFields(requiredFields)(values) // executes the validation on values
    : innerValidateRequiredFields(requiredFields) // returns a validation function
);

/**
 * given a validity state, returns true if value is "VALID(2)" or false otherwise
 * @type {Function}
 * @returns boolean
 */
export const memoizeIsSignificantValue = _memoize(
  validityState => validityState === SIGNIFICANT_VALIDITY_STATE_VALUE
);

/**
 * @param key // the main parameter key to which look for a specific value
 * @param path // the path to the value
 * @returns {*} // the value
 * @throws Error // when nothing found
 */
export const getParameterOrThrowError = (key, path) => {
  const params = parameters.get(key);
  const value = _.getOr(undefined, path, params);
  if (value === undefined) throw new Error(`Invalid configuration detected, nothing found in ${key}[${JSON.stringify(path)}]`);
  return value;
};

// define a default value for connectedData.dataType if not already set
const DATA_TYPE_PATH = 'connectedData.dataType';
export const getEntryPointWithDataTypeInitialized = entryPoint => (
  _.getOr(undefined, DATA_TYPE_PATH, entryPoint)
    ? entryPoint
    : _.set(DATA_TYPE_PATH, TIME_BASED_DATA_OPTION.value, entryPoint)
);
