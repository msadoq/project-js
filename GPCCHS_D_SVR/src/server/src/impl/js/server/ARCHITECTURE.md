# ARCHITECTURE

## Sub-components
* HS Server (node, HSS)
* HS Client (electron, HSC)
* TimeBar (QT, TB)
* Data Communication (C++, DC)

## Inter-components communication

### DC<->HSS communication

Two ZeroMQ sockets are opened between HSS et DC:
* **dcPull**: pull for HSS and push for DC
* **dcPush**: push for HSS and pull for DC

Every HS->DC messages are encoded with **DcClientMessage** protobuf.
Every DC->HS messages are encoded with **DcServerMessage** protobuf.

**Domain request**
On startup HS asks to DC domain list with **DomainQuery** message.
DC responds with **DomainResponse** message.

**pub/sub data subscription**
On every new connectedData discovered HSC inform HSS to start listening on DC with **DataSubscribe** message (*action*=0).
On every new connectedData discovered HSC inform HSS to stop listening on DC with **DataSubscribe** message (*action*=2).
After both DC answers immediately a **DcResponse** message to confirm or indicate an error.

**archive data query**
Anytime HSS need data from archive it send a **DataQuery** to DC.
DC answer immediately a **DcResponse** message to confirm or indicate an error.

**new data**
When DC received pub/sub new data or query answer from archive he send a **NewDataMessage** to HSS. 

### TB<->HSS communication

One ZeroMQ socket is opened between HSS and TB:
* **tb**: pull for HSS and push for TB

Messages are plain JSON.

TODO : add open workspace scenario

**TB update**
Everytime timebar changes (visualization window, play mode, timelines...) a message with the whole TB state is sent from TB to HSS.

### HSS<->HSC communication

*n* websockets (bidirectional) are opened by HSC on HSS:
* **main**: for communication between electron main process and HSS
* *windowId*: for communication between each electron window and HSS






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

### New data from DC (onNewDataMessage)

* decode protobuf
* if protobuf has 'realtime' flag:
 - if this data corresponds to a known **requestedIntervals** insert records in **cacheJson**
* if protobuf hasn't 'realtime' field:
 - insert records in **cacheJson**
 - if protobuf has 'finish' field:
   - set corresponding **requestedIntervals** as received
* call .onNewDataMessage(data) on each view

### TB change

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
