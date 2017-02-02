Incoming data message (timebasedData):
```
{
  'remoteId': {
      'timestamp': { ...payload... }
    }
  ]
}
```

View data map:
```
{
    'viewId': {
        type: 'TextView',
        entryPoints: {
            'name': {
              remoteId: string,
              field: string,
              expectedInterval: [number, number],
            },
        },
    },
    'viewId': {
      type: 'PlotView',
      entryPoints: {
          'name': {
            remoteId: string,
            fieldX: string,
            fieldY: string,
            color: string,
            expectedInterval: [number, number],
          },
      },
    },
}
```

View requests state:
```
{
    'viewId': {
        entryPoints: {
            'name': {
              remoteId: string,
              requestedInterval: [number, number],
            },
        },
    },
    'viewId': {
      entryPoints: {
          'name': {
            remoteId: string,
            requestedInterval: [number, number],
          },
      },
    },
}
```

View data state:
```
{
  // TextView
  'viewId': {
    index: { 'name': 'fieldX' },
    values: { 'name': 'value' },
  },
  // PlotView
  'viewId': {
    index: { 'name': ['fieldX'] },
    lines: [
      { key: 'key1', name: string }
    ],
    columns: [
     {
       x: 'timestamp', // => master's timestamp
       'key1': { x: 'fieldX', value: number },
       ...
     }
   ]
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
