function getQuery(parameterName, intervals) {
  return {
    [`range@Reporting.${parameterName}<ReportingParameter>:0:4:convertedValue.!=.0`]: {
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

function getDataMap(parameterName, intervals) {
  return {
    [`range@Reporting.${parameterName}<ReportingParameter>:0:4:convertedValue.!=.0`]: {
      structureType: 'range',
      dataId: {
        catalog: 'Reporting',
        parameterName,
        comObject: 'ReportingParameter',
        domainId: 4,
        sessionId: 0,
      },
      filter: [
        {
          field: 'convertedValue',
          operator: '!=',
          operand: '0',
        },
      ],
      localIds: {
        'groundDate.455e6651-42e2-421f-bcb2-8f07929dd9f7:0': {
          field: 'groundDate',
          timebarId: '455e6651-42e2-421f-bcb2-8f07929dd9f7',
          offset: 0,
          expectedInterval: intervals,
        },
      },
    },
  };
}

module.exports = {
  getQuery,
  getDataMap,
};
