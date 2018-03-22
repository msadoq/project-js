// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
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

        if (comObject.indexOf('ReportingParameter') > -1) {
          result += '.convertedValue';
          return result;
        } else if (comObject.indexOf('DecommutedPacket') > -1) {
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

