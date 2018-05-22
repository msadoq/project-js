const constants = require('constants');

const PACKETS_TYPES = constants.PACKETS_TYPES;

// eslint-disable-next-line import/prefer-default-export
export const buildFormula = (catalog, catalogItem, comObject, comObjectField) => {
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
