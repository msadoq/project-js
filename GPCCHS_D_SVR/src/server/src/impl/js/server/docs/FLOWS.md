# Architecture

dataId (flat): catalog + parameterName + comObject + sessionId + domainId
remoteId: DataId + filters
localId: type + field + offset

**Pub/sub data subscription**
1. HSC loads and displays <SubscriptionsContainer/> on each visible window (1 per window)
2. React component lifecycle determine for which connectedData if we should open or close

**Archived data queries (onDataQuery)**
1. HSC loads and displays <DataConsumerContainer/> on each visible page (1 per window)
2. <DataConsumerContainer/>
  - compute visible remoteId:localId
  - read timebar visuWindow
  - request missing intervals
3. HSS receive queries batch and for each remoteId:
  - create connectedData model if not already exists
  - retrieveMissingIntervals on connectedData model
  - add requested interval(s) to connectedData model
  - send requests to DC
4. retrieve existing data in cache for missing interval and send newData to HSC main process (=>HSC)

**Archived data arriving (onQueryData)**
1. Loop on each value
   2. Determine if incoming queryId exists in connectedData models
   3. Mark connectedData model interval as received if isEndOfQuery
   4. Insert payloads in timebasedData model
   5. Send data to HSC main process (=>HSC)

**Pub/sub data arriving (onSubscriptionData)**
1. Determine if arriving dataId has a subscription model and get filters
2. Get connectedData model
3. Loop on remoteIds:
   4. **apply filters** (maybe more than one) on each incoming data
   5. determine for if (each) payloads areTimestampsInKnownIntervals
   6. insert payloads in timebasedData model
7. Send data to HSC main process (=>HSC)

**HSS data arriving**
1. For each remoteId in incoming data, find Redux localIds, loop on it:
  - Apply offset time filtering
  - Apply view type logic
  - Retain only expected field
  - Insert in Redux state
2. Store is synced with renderer processes
3. React trees are processed


newData:

```
{
  remoteId: [
    {timestamp, ReportingParameter}
  ]
  ...
}
```

Redux:

```
{
  remoteId: {
    localId: [
      {timestamp, fieldValue},
      ...
    ],
    ...
  } 
  ...
}
```

function (pageRemoteIds{localIds}, hssRemoteIds[payloads]) {}