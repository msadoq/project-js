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

**dataQuery** (HSC->HSS)
```
{
  event: 'dataQuery',
  payload: {
    remoteId: {
      dataId: dataId,
      filter: [filter],
      intervals: [
        [number, number],
      ],
    },
  },
}
```

**dataQuery** (HSS->DC)
```
[
  'dataQuery',
  string, // unique query ID
  dataId,
  [filter],
]
```

**dataSubscription** (HSS->DC)
```
[
  'dataSubscription',
  string, // unique query ID
  dataId,
  enum('ADD', 'DELETE'),
]
```

**queryData** (DC->HSS)
```
[
  'queryData',
  string, // unique query ID
  dataId,
  boolean, // is last the last chunk for query ID
  timestamp,
  payload,
  timestamp,
  ...
]
```

**subscriptionData** (DC->HSS)
```
[
  'subscriptionData',
  string, // unique query ID
  dataId,
  timestamp,
  payload,
  timestamp,
  ...
]
```

**newData** (HSS->HSC)
```
{
  event: 'newData',
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
**dcResponse** (DC->HSS)
```
[
  'dcResponse',
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
**dcHeader**
```
enum(‘domainQuery’, ‘dataQuery’, ‘dataSubscription’, ‘dcResponse’, 'domainData', 'queryData', 'subscriptionData')
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

**filter**
```
{
  field: string,
  operator: enum(OP_EQ, OP_NE, OP_LT, OP_LE, OP_GT, OP_GE, OP_CONTAINS, OP_ICONTAINS),
  operand: string|number,
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
