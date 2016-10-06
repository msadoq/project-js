
// Quand tu reçois un remoteId, tu récupères les localIds dans dataRequests, tu boucle dessus
// Tu récupéres la visuWindow (timebarId)
// Tu récupéres dans external selon le type de vue: 
//    newState = getNewDataCacheState([currentStatePortion], visuWindow, field, offset)


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
    localId: { // ordered
       timestamp: value, // value=field
    },
  }
}
```

Data requests send to HSS list:

```
dataRequests: {
  remoteId: {
    dataId: {...},
    filter: [{...}],
    localIds: {
      localId: { viewType, field, offset[, timebarId] },
    },
    intervals: [],
  }
},
```
