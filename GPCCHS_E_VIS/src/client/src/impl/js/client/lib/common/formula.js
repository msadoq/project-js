import _memoize from 'lodash/memoize';

const pattern = /^([^.]+)\.([^<]+)<([^>]+)>(\.){0,1}([\w]+){0,1}$/i;

/**
 * Parse formula string and return an object with extracted data.
 *
 * formula sample 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue'
 * should be parsed in:
 * {
 *   formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue'
 *   catalog: 'Reporting',
 *   parameterName: 'ATT_BC_STR1VOLTAGE',
 *   comObject: 'ReportingParameter',
 *   field: 'extractedValue' <-- Optional
 * }
 *
 * @param formula
 * @returns {*}
 */
function parseFormula(formula) {
  if (typeof formula !== 'string' || !pattern.test(formula)) {
    return undefined;
  }

  const matches = formula.match(pattern);
  // Check validity of field : a . must be in 4th position if table length is 5
  if (matches[5]) {
    if (matches[4] !== '.') return undefined;
  } else if (matches[4]) {
    return undefined;
  }
  const parsed = {
    formula,
    catalog: matches[1],
    parameterName: matches[2],
    comObject: matches[3],
    field: matches[5],
  };
  if (!parsed.catalog || !parsed.parameterName || !parsed.comObject) {
    return undefined;
  }

  return parsed;
}

export default _memoize(parseFormula);
