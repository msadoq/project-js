const debug = require('../lib/io/debug')('stub:paramInjector');
const Long = require('long');
// STOP at  8400000 iterations by default
// STOP at 12300000 iterations with --max_old_space_size=2048
// STOP at 24300000 iterations with --max_old_space_size=4096
// DO the  25000000 iterations with --max_old_space_size=5120

const MAX = 25000000;
const STEP = 1000000;
const STARTVALUE = 1420675200000;

const newReportingParameter = (t) => {
  const reportingParameter = {
    onboardDate: t,
    groundDate: Math.round(new Date().getTime() / 1000),
    convertedValue: Math.floor((Math.random() * 100) + 1),
    rawValue: Math.floor((Math.random() * 100) + 1),
    extractedValue: Math.floor((Math.random() * 100) + 1),
    triggerOnCounter: '6',
    triggerOffCounter: '8',
    monitoringState: 'INFORMATIONAL',
    validityState: 'INVALIDE',
    isObsolete: false,
    isNominal: false,
  };

  return reportingParameter;
};

const newData = (t) => {
  const OID = `000100010100010001${Math.floor((Math.random() * 99999999) + 1)}`;
  const data = {
    catalog: 'Reporting',
    fullDataId: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
    oid: OID,
    parameter: 'ATT_BC_STR1VOLTAGE',
    session: 1,
    timestamp: Long.fromNumber(t),
    type: 'ReportingParameter',
    jsonPayload: newReportingParameter(t),
  };

  return data;
};
const injectParameters = (collection, nb = MAX, start = STARTVALUE) => {
  debug.info(`Injecting ${nb} parameters from timestamp ${start}`);
  let timestamp = start;
  for (let i = 1; i <= nb; i++) {
    if (i % STEP === 0) {
      debug.info(`Already ${i} parameters injected`);
    }

    const data = newData(timestamp);
    collection.insert(data);
    timestamp++;
  }
  debug.info('Injection done.');
};

module.exports = { injectParameters, newData };
