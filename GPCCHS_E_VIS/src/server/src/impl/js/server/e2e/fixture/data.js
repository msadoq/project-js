const { v4 } = require('node-uuid'); // eslint-disable-line import/no-extraneous-dependencies
const {
  getDomains,
  getSessions,
  getReportingParameter,
} = require('common/stubs/data'); // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved
const globalConstants = require('common/constants'); // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved

function getDomain() {
  return {
    event: 'domainData',
    queryId: v4(),
    payload: getDomains().domains,
  };
}

function getSession() {
  const sessions = getSessions().sessions;
  sessions.forEach(s => delete s.timestamp.ms); // eslint-disable-line no-param-reassign

  return {
    event: 'sessionData',
    queryId: v4(),
    payload: sessions,
  };
}

function getQuery(parameterName, intervals) {
  return {
    'range@Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:convertedValue.!=.0': {
      type: 'range',
      dataId: {
        catalog: 'Reporting',
        parameterName,
        comObject: 'ReportingParameter',
        domainId: 4,
        sessionId: 0,
      },
      intervals,
      filters: [
        {
          fieldName: 'convertedValue',
          type: 1,
          fieldValue: '0',
        },
      ],
    },
  };
}

function getEmptyTimebasedData() {
  return {
    event: 'timebasedData',
    payload: {},
  };
}

function getTimebasedPayload(parameterName, start, end) {
  function getValue(timestamp) {
    return (1 + Math.sin(timestamp / 6000));
  }

  const now = Date.now();
  const payload = {};

  for (let i = start; i <= end && i < now; i += globalConstants.DC_STUB_VALUE_TIMESTEP) {
    let epNumber = 0;
    Buffer.from(parameterName).forEach((val) => { epNumber += val; });
    const value = getValue(i) + (epNumber / 10);
    payload[i] = getReportingParameter({
      groundDate: i + 20,
      onboardDate: i,
      convertedValue: value,
      rawValue: value,
      extractedValue: value,
    });
  }

  return payload;
}

function getTimebasedData(parameterName, start, end, dataIdString) {
  return {
    event: 'timebasedData',
    payload: {
      [dataIdString]: getTimebasedPayload(parameterName, start, end),
    },
  };
}

module.exports = {
  getDomain,
  getSession,
  getQuery,
  getEmptyTimebasedData,
  getTimebasedData,
};
