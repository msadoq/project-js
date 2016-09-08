/**
 * dataFullName sample 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue'
 * should be parsed in:
 * {
 *   dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue'
 *   catalog: 'Reporting',
 *   parameter: 'ATT_BC_STR1VOLTAGE',
 *   type: 'ReportingParameter',
 *   field: 'extractedValue'   <-- Optional
 * }
 */

const pattern = /^([^\.]+)\.([^<]+)<([^>]+)>(\.){0,1}([\w]+){0,1}$/i;
module.exports = dataFullName => {
  if (typeof dataFullName !== 'string' || !pattern.test(dataFullName)) {
    return undefined;
  }

  const matches = dataFullName.match(pattern);
  // Check validity of field : a . must be in 4th position if table length is 5
  if (matches[5]) {
    if (matches[4] !== '.') return undefined;
  } else if (matches[4]) {
    return undefined;
  }
  const parsed = {
    // TODO : remove from communication with DC
    // TODO : sometimes dataFullName sometimes fullDataId
    dataFullName,
    catalog: matches[1],
    parameter: matches[2],
    type: matches[3],
    field: matches[5],
  };
  if (!parsed.catalog || !parsed.parameter || !parsed.type) {
    return undefined;
  }

  return parsed;
};
