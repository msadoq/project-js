# Messages

## domains

**domainQuery** (HSC->HSS)
```
{
  event: 'domainQuery',
  payload: {},
}
```

**domainQuery** (HSS->DC)
```
[
  'domainQuery',  // (Protobuf Header)
  string, // unique query ID (Protobuf String)
]
```

**domainData** (DC->HSS)
```
[
  'domainData', // (Protobuf Header)
  string, // unique query ID // (Protobuf String)
  [
    {
      domainId: number,
      itemNamespace: string,
      name: string,
      oid: string,
      parentDomainId: number,
    },
  ], // (Protobuf Domains)
]
```

**domainData** (HSS->HSC)
```
{
  event: 'domainData',
  payload: [
    {
      domainId: number,
      itemNamespace: string,
      name: string,
      oid: string,
      parentDomainId: number,
    },
  ],
}
```

## client lifecycle and errors

**identity** (HSC->HSS)
```
{
  event: 'identity',
  payload: {
    identity: 'main',
  },
}
```

**authenticated** (HSS->HSC)
```
{
  event: 'authenticated',
  payload: {},
}
```

**disconnect**
```
// no data
```

## timebar

**timebarsInit** (HSC->HSS)
```
{
  event: 'timebarsInit',
  payload: {/* timebars state */},
}
```

**timebarsInit** (HSS->TB)
```
{
  event: 'timebarsInit',
  payload: {/* timebars state */},
}
```

**timebarsUpdate** (TB->HSS)
```
{
  event: 'timebarsUpdate',
  payload: {/* timebars state */},
}
```

**timebarsUpdate** (HSS->HSC)
```
{
  event: 'timebarsUpdate',
  payload: {/* timebars state */},
}
```

## data

**timebasedQuery** (HSC->HSS)
```
{
  event: 'timebasedQuery',
  payload: {
    remoteId: {
      dataId,
      intervals: [
        [number, number],
      ],
      queryArguments,
    },
  },
}
```

**timebasedQuery** (HSS->DC)
```
[
  'timebasedQuery', // (Protobuf Header)
  string, // unique query ID // (Protobuf String)
  dataId, // (Protobuf DataId)
  timeInterval, // (Protobuf TimeInterval)
  queryArguments, // (Protobuf QueryArguments)
]
```

**timebasedSubscription** (HSS->DC)
```
[
  'timebasedSubscription', // (Protobuf Header)
  string, // unique query ID // (Protobuf String)
  dataId, // (Protobuf DataId)
  enum('ADD', 'DELETE'), // (Protobuf Action)
]
```

**timebasedArchiveData** (DC->HSS)
```
[
  'timebasedArchiveData', // (Protobuf Header)
  string, // unique query ID // (Protobuf String)
  dataId, // (Protobuf DataId)
  boolean, // is last the last chunk for query ID // (Protobuf Boolean)
  timestamp, // (Protobuf Timestamp)
  payload, // (Protobuf of payload type)
  timestamp, // (Protobuf Timestamp)
  ...
]
```

**timebasedPubSubData** (DC->HSS)
```
[
  'timebasedPubSubData', // (Protobuf Header)
  dataId, // (Protobuf DataId)
  timestamp, // (Protobuf Timestamp)
  payload, // (Protobuf of payload type)
  timestamp, // (Protobuf Timestamp)
  ...
]
```

**timebasedData** (HSS->HSC)
```
{
  event: 'timebasedData',
  payload: {
    remoteId: [
      {
        timestamp,
        payload,
      }
    ],
  },
}
```

## DC communication
**response** (DC->HSS)
```
[
  'response', // (Protobuf Header)
  string, // unique query ID // (Protobuf String)
  enum(’SUCCESS’, ‘ERROR'), // (Protobuf Status)
  string, // error message // (Protobuf String)
]
```

**error** (HSS->HSC)
```
{
  event: 'error',
  type: enum('response'),
  payload: {
    message: string,
  },
}
```

## Sub-structures
**header**
```
enum(‘domainQuery’, ‘timebasedQuery’, ‘timebasedSubscription’, ‘response’, 'domainData', 'timebasedArchiveData', 'timebasedPubSubData')
```

**dataId**
```
{
  catalog: string,
  parameterName: string,
  comObject: string,
  sessionId: number,
  domainId: number,
  oid: string, // for DC
  sourceOid: string, // for DC
  url: string, // for FDS
  version: string, // for FDS
}
```

**timeInterval**
```
{
  startTime: timestamp,
  endTime: timestamp,
}
```

**timestamp**
```
{
  ms: number,
  ps: number,
}
```

**queryArguments**
```
{
  filters: [filter], // optional
  sortFieldName: string, // optional
  sortOrder: enum('ASC', 'DESC'), // startTime
  limitStart: number,
  limitNumber: number,
  getLastType: enum('getLast', 'getNLast'),
  getLastFromTime: timestamp, // optional
  getLastNumber: number, // optional
  // the 3 above parameters allow getLast(), getLast(fromTime), getNLast(number), getNLast(number, fromTime)

  // TODO sampling
}
```

**filter**
```
{
  fieldName: string,
  type: enum(OP_EQ, OP_NE, OP_LT, OP_LE, OP_GT, OP_GE, OP_CONTAINS, OP_ICONTAINS),
  fieldValue: ccsds_mal_attribute, // cf. LPISIS
}
```

**domain**
```
{
  domainId: number,
  itemNamespace: string,
  name: string,
  oid: string,
  parentDomainId: number,
}
```
