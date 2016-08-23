/**
 * dataFullName sample 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>' should be parsed in:
 * {
 *   dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>'
 *   catalog: 'Reporting',
 *   parameter: 'ATT_BC_STR1VOLTAGE',
 *   type: 'ReportingParameter'
 * }
 */

const pattern = /^([^\.]+)\.([^<]+)<([^>]+)>$/i;

module.exports = dataFullName => {
  if (typeof dataFullName !== 'string' || !pattern.test(dataFullName)) {
    return undefined;
  }

  const matches = dataFullName.match(pattern);
  const parsed = {
    // TODO : remove from communication with DC
    // TODO : sometimes dataFullName sometimes fullDataId
    dataFullName,
    catalog: matches[1],
    parameter: matches[2],
    type: matches[3],
  };
  if (!parsed.catalog || !parsed.parameter || !parsed.type) {
    return undefined;
  }

  return parsed;
};
