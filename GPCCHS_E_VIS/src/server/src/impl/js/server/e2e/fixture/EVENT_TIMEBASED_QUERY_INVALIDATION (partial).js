module.exports = {
  connectedData: [{
    type: 'range',
    remoteId: 'range@Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:convertedValue.!=.0',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'TMMGT_BC_VIRTCHAN3',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 0,
    },
    intervals: {
      all: [
        [1479772740000, 1479772770000],
      ],
      received: [
        [1479772740000, 1479772770000],
      ],
      requested: {},
    },
    meta: {
      revision: 0,
      version: 0,
    },
    $loki: 1,
  }],
  subscriptions: [{
    flatDataId: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'TMMGT_BC_VIRTCHAN3',
      comObject: 'ReportingParameter',
      domainId: 4,
      sessionId: 0,
    },
    filters: {
      'range@Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:convertedValue.!=.0': [{
        fieldName: 'convertedValue',
        type: 1,
        fieldValue: '0',
      }],
    },
    meta: {
      revision: 0,
      version: 0,
    },
    $loki: 1,
  }],
  timebasedData: {
    'range@Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:convertedValue.!=.0': 30,
  },
};
