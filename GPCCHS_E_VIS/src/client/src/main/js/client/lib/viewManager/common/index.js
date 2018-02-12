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
