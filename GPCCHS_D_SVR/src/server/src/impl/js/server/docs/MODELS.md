# Models

## connectedData

Example:
```
{
  remoteId: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:groundDate.OP_LT.42,groundDate.OP_GT.13',
  intervals: {
    requested: {
      '1d8ebb73-2ef8-4cf7-988f-40766decf93b': [13, 42]
    },
    received: [
      [0, 13],
      [42, 91]
    ],
    all: [
      [0, 91]
    ]
  }
}
```

* ``remoteId``is a string representing the dataId (catalog, parameterName, comObject, sessionId, domainId) and the applied filters (field, operator, operand). It is the unique key of the model
* ``intervals`` is an object
  - ``intervals.received`` is an array of fully received intervals of archive data
  - ``intervals.requested``is an object whose keys are query ids and values are query intervals
  - ``intervals.all`` is an array of the merging of both received and requested intervals

## subscriptions

Example:
```
{
  flatDataId: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200',
  dataId: {
    catalog: 'Reporting',
    parameterName: 'ATT_BC_STR1STRRFQ1',
    comObject: 'ReportingParameter',
    sessionId: 100,
    domainId: 200
  },
  filters: {
    'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:groundDate.OP_LT.42,groundDate.OP_GT.13': [
      {
        field: 'groundDate',
        operator: 'OP_LT',
        operand: 42
      },
      {
        field: 'groundDate',
        operator: 'OP_GT',
        operand: 13
      }
    ]
  }
}
```

* ``flatDataId`` is a string representing the dataId. It is the unique key of the model
* ``dataId`` is an object (TODO maybe no longer needed)
  - ``dataId.catalog`` is a string representing the name of the catalog
  - ``dataId.parameterName`` is a string representing the name of the parameter
  - ``dataId.comObject`` is a string representing the name of the comObject
  - ``dataId.sessionId`` is an integer representing the id of the session
  - ``dataId.domainId`` is an integer representing the id of the domain
* ``filters`` is an object whose keys are remoteIds for which this subscription is queried and values the filters associated to the queries
  - ``filters[remoteId]`` is an array of objects
    * ``filters[remoteId][index].field`` is a string representing the field of the parameter to filter
    * ``filters[remoteId][index].operator`` is a string enum of the comparison operator (``OP_EQ``, ``OP_NE``, ``OP_LT``, ``OP_LE``, ``OP_GT``, ``OP_GE``, ``OP_CONTAINS``, ``OP_ICONTAINS``)
    * ``filters[remoteId][index].operand`` is the comparison value. It may be a string or an integer (TODO is it ?)



## cacheJson (TODO maybe we should rename it as timebasedData for example)

Example:
```
{
  remoteId: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:groundDate.OP_LT.42,groundDate.OP_GT.13',
  timestamp: 55,
  payload: {
    // An object depending on the type of comObject
  }
}
```

* ``remoteId``is a string representing the remoteId (see connectedData)
* ``timestamp`` is an integer representing the timestamp of the data
* ``payload`` is an object representing the content of the data, it is specific to the comObject type
