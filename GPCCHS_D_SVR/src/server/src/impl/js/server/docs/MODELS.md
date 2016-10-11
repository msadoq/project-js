# Models

## Loki

**connectedData**

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

**subscriptions**

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
        fieldName: 'groundDate',
        type: 2,
        fieldValue: 42
      },
      {
        fieldName: 'groundDate',
        type: 4,
        fieldValue: 13
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
    * ``filters[remoteId][index].fieldName`` is a string representing the field of the parameter to filter
    * ``filters[remoteId][index].type`` is an enum representing the type of comparison operator (``OP_EQ (0)``, ``OP_NE (1)``, ``OP_LT (2)``, ``OP_LE (3)``, ``OP_GT (4)``, ``OP_GE (5)``, ``OP_CONTAINS (6)``, ``OP_ICONTAINS (7)``)
    * ``filters[remoteId][index].fieldValue`` is the comparison value. It is a polymorphic value (ccsds_mal_attribute)



**timebasedData**

Example:
```
{
  remoteId: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:groundDate.OP_LT.42,groundDate.OP_GT.13',
  timestamp: 55,
  payload: {/* an object depending on the type of comObject */}
}
```

* ``remoteId``is a string representing the remoteId (see connectedData)
* ``timestamp`` is an integer representing the timestamp of the data
* ``payload`` is an object representing the content of the data, it is specific to the comObject type

## Singletons

**registeredQueries**

Example:
```
{
  '1d8ebb73-2ef8-4cf7-988f-40766decf93b': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:groundDate.OP_LT.42,groundDate.OP_GT.13'
}
```

* Object whose keys are queryIds and values are remoteIds

**registeredCallbacks**

Example:
```
{
  '1d8ebb73-2ef8-4cf7-988f-40766decf93b': (err) => { if (err) { throw err; } }
}
```

* Object whose keys are queryIds values are callback functions

**domains**

TODO
