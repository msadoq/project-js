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
  'domainQuery',
  string, // unique query ID
]
```

**domainData** (DC->HSS)
```
[
  'domainData',
  string, // unique query ID
  [
    {
      domainId: number,
      itemNamespace: string,
      name: string,
      oid: string,
      parentDomainId: number,
    },
  ],
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
  'timebasedQuery',
  string, // unique query ID
  dataId,
  timeInterval,
  queryArguments,
]
```

**timebasedSubscription** (HSS->DC)
```
[
  'timebasedSubscription',
  string, // unique query ID
  dataId,
  enum('ADD', 'DELETE'),
]
```

**timebasedArchiveData** (DC->HSS)
```
[
  'timebasedArchiveData',
  string, // unique query ID
  dataId,
  boolean, // is last the last chunk for query ID
  timestamp,
  payload,
  timestamp,
  ...
]
```

**timebasedPubSubData** (DC->HSS)
```
[
  'timebasedPubSubData',
  dataId,
  timestamp,
  payload,
  timestamp,
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
  'response',
  string, // unique query ID
  enum(’SUCCESS’, ‘ERROR'),
  string, // error message
]
```

**error** (HSS->HSC)
```
{
  event: 'error',
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
