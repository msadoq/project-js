const serializeFilters = filters =>
  filters.map(f => `${f.fieldName}.!=.${f.fieldValue}`)
    .reduce((acc, f) => `${acc},${f}`, '').replace(/^,/, '');

function getQuery(
  parameterName,
  intervals,
  structureType = 'range',
  filters = [{
    fieldName: 'convertedValue',
    type: 1,
    fieldValue: '0',
  }]
) {
  return {
    [`${structureType}@Reporting.${parameterName}<ReportingParameter>:0:4:${serializeFilters(filters)}`]: {
      type: 'range',
      dataId: {
        catalog: 'Reporting',
        parameterName,
        comObject: 'ReportingParameter',
        domainId: 4,
        sessionId: 0,
      },
      intervals,
      filters,
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
