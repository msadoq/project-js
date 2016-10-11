Incoming data message:
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

Cached data:
```
dataCache: {
  remoteId: {
    localId: [ // ordered
      timestamp: value, // value=field  
    ], // TODO update
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
