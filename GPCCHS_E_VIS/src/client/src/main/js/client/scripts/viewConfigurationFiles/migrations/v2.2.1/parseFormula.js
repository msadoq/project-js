const pattern = /^([^.]+)\.([^<]+)<([^>]+)>(\.){0,1}([\w]+){0,1}$/i;

/**
 * Parse the specified formula and returns the related formula fields
 *
 * @param formula
 * @returns {object} formula fields
 */
function parseFormula(formula) {
  if (typeof formula !== 'string' || !pattern.test(formula)) {
    return undefined;
  }

  const matches = formula.match(pattern);
  // Check validity of field : a . must be in 4th position if table length is 5
  if (matches[5]) {
    if (matches[4] !== '.') {
      return undefined;
    }
  } else if (matches[4]) {
    return undefined;
  }
  const parsed = {
    formula,
    catalog: matches[1],
    catalogItem: matches[2],
    comObject: matches[3],
    comObjectField: matches[5],
  };
  if (!parsed.catalog || !parsed.catalogItem || !parsed.comObject) {
    return undefined;
  }

  return parsed;
}

module.exports = {
  parseFormula,
};
