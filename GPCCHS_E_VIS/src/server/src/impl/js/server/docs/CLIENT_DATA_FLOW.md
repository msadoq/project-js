Incoming data message:
```
{
  'remoteId': { // <= loop
    dataId: {},
    filter: {},
    localIds: {
      'localId': { // <= loop
        type: string,
        field: string,
        timebarId: string,
        offset: string,
      }
    }
  }
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
