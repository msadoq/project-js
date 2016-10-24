Incoming data message (timebasedData):
```
{
  'remoteId': [
    {
      timestamp: 'timestamp',
      payload: { ....'fields'... }
    }
  ]
}
```

View data cache map:
```
{
  'remoteId': {
    'viewId': {
      type: string,
      entryPoints: {
        'name': {
          field: string,
          options: { color: string },
          expectedInterval: [number, number],
        },
      }
    },
  },
}
```

View cached data:
```
{
  // TextView
  'viewId': {
    index: { 'name': 'timestamp' },
    values: { 'name': 'value' },
  },
  // PlotView
  'viewId': {
    index: { 'name': ['timestamp'] },
    lines: [
      { key: 'key1', color: string, name: string }
    ],
    columns: {
      'name': [
        { x: 'timestamp', 'key1': number }
      ]
    }
  },
}
```


Cached data:
```
dataCache: {
 'remoteId': {
   'localId': { timestamp: 'timestamp', value: number }, // Text
   'localId': {
     index: [timestamp],
     data: { 'timestamp': number }, // Plot
   },
 }
}
```

Data requests send to HSS list:
```
dataRequests: {
  remoteId: {
    dataId: {
        catalog,
        parameterName,
        comObject,
        sessionId,
        domainId,
    },
    intervals: [[number, number]],
    queryArguments: {
      sortOrder,
      limitStart,
      limitNumber,
      getLastType,
      getLastFromTime,
      getLastNumber,
      filters: [{
        fieldName,
        type,
        fieldValue,
      }],
    }
  }
},
```
