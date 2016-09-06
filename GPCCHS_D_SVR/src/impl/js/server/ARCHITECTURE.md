# ARCHITECTURE

## TODO
* [ ] Add play / pause mode with upcoming buffer request
* [ ] Add view update and take care of view (page) in each previous flows
* [ ] Add close view flow
* [ ] Handle virtual interval for realtime data (when i'm in realtime)
* [ ] Data filtering and timeline and bufferisation offset is operate on HSS before sending to HSC
* [ ] Implement a view adapter for each view type on server side to control data to retrieve and send to view
* [ ] Could filter data sending from HSS to HSC based on view (page) visibility

## Sub-components
* HS Server (node, HSS)
* HS Client (electron, HSC)
* TimeBar (QT, TB)
* Data Communication (C++, DC)

## Launching and stopping

On application start CNT/IHM component launch:
* an HSS instance with a set of port (for listening and TB, DC communication)
* an HSC instance with HSS port and optionally a workspace file path

On application close (by user from HSC or on SIGTERM to HSS or HSC)
* HSC and HSS should be closed
* DC should be informed of this shutdown to be able to unsubdcribe from realtime data

/!\ Close process wasn't discussed until now.

## Inter-components communication

Overview:
* From HSS to DC:
  - DataQuery 
  - DataSubscribe 
* From DC to HSS:
  - data (from archive or realtime)
* From TB to DC:
  - timeBarConfiguration

### HSS->DC (ZeroMQ/Protobuf)
**DataQuery**

Ask DC to request datastore for parameter data on a particular interval:
* id
* dataId (catalog, parameterName, comObject, sessionId, domainId)
* timeInterval(lower, upper)

**DataSubscribe**

Inform DC to pass realtime data to HSS for a particular parameter:
* id
* dataId (catalog, parameterName, comObject, sessionId, domainId)
* action (enum(add, remove))

### DC->HSS (ZeroMQ/Protobuf)

Two sockets (1 for realtime and 1 for query data) with the same behavior.

We received data as ZeroMQ messages that can contains one or more value for a given parameter.
Each message is compound of a first frame:
* id
And a length undefined peers of frames:
* timestamp
* payload

/!\ This data format is not ideal cause it's very difficult to implement in each component that
    consume data from DC

### TB->HSS (ZeroMQ/Protobuf)
**timeBarConfiguration**

Inform HSS with the new TB interval: see [TB.example.json](./lib/schemaManager/examples/TB.example.json)

### HSS->HSC (Websocket)

**timeBarConfiguration**

Inform HSC with the new TB interval:
* TODO

/!\ maybe not needed as HSS determine by itself which data to pass to each view

**displayData**

Give HSC a new set of data:
* data (format and quantity depends on view type)

### HSC->HSS (Websocket)

**connect**

Contains a payload with view description:
* id
* type

**view_update**

Inform HSS with new view dimension and view visibility:
* TODO

### HSC/HSS (REST)

**document creation, opening, saving**

## Flows

### HSC launching

* HSC received a computed version of workspace/pages/views to open
* HSC launch electron
** Initiate redux store with received data
** Open a main websocket with HSS
* HSC opens windows
* Each windows renders pages
* Each pages render views as containerized WebView (http://electron.atom.io/docs/api/web-view-tag/)
** Inside view WebView see [View opening](View opening)

### View opening

* View opens a websocket with HSS (viewId)
* HSS creates a record in **openedWebsockets**
* View transmits to HSS a parameter subscription (parameterSubscriptionId, catalog, parameter, type, filter)
* For each HSS:
  - creates a record in **subscribedParameters** (adding viewId)
  - looks for existing intervals (based on Timebar position) in cache for this parameter
  - ask DC (**dataQuery**) for each missing interval and for each creates record in **requestedIntervals**
  - apply filters on cached data
  - send cached data to HSC view (**displayData**)

/!\ Already in cache data search doesn't works for realtime data, we should trace that realtime data was received

### New archive data from DC

* On each incoming **dataQuery** HSS:
  - set corresponding **requestedIntervals** as received
  - insert records in **cacheJson**
  - determine if data should be send to HSC view (based on TB position and view type)
  - apply filters on data
  - send data to HSC view (**displayData**)

### New realtime data from DC

* On each incoming **dataRealtime** HSS:
  - same as [New archive data from DC](New archive data from DC) without **requestedIntervals** step
 
### TB change

// 1. [Inform each view of the new timebar position (if needed)]
// 1. HSS loop on each opened view and determine if data is already present

* On each incoming TB **timeBarConfiguration** message HSS loop on views and depending view type:
  - PlotView:
    - Compares with previous TB state, establish current displayed interval and missing interval(s) in view
    - Request cache for existing interval
    - Ask missing interval to DC
    - Send cached interval to HSS
  - TextView:
    - Compares with previous TB state and established if view has al
    - Request cache for existing value
    - Ask missing value to DC
    - Send cached value to HSS 
    
/!\ TAKE IN CONSIDERATION TIMELINE OFFSET

+ realtime unsubcribtion

## HSS
HSS should have full knowledge of open view and visible data in HSC in realtime.
HSS maintains Loki collection for:
- **openedWebsockets**: list of opened Websocket with for each the parameter and the state (visible or not)
- **subscribedParameters**: whole list of parameter visible in views
- **requestedIntervals**: whole list of interval requested for each parameter (<= cleaned on cache invalidation)
- **cacheJson**: list of received data (archive and realtime) from DC for each parameter (<= cleaned on cache invalidation)

## HSC
```
1 electron instance
 |_ 1 websocket
 |_ **n** windows
    |_ **n** pages
      |_ **n** views 
        |_ 1 websocket connection
        |_ **n** subscription ID
```
