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
See [TB.example.json](./lib/schemaManager/examples/TB.example.json)

### HSS<->HSC communication

*n* websockets (bidirectional) are opened by HSC on HSS:
* **main**: only one
* *windowId*: one by opened window

## HSS controllers

**onClientOpen**:
* no particular action
**onClientClose**: 
* no particular action
**onWindowOpen**: 
* no particular action
**onWindowClose**: 
* unsubscribe every connectedData (listened only by this window) and destroy all view instance of closing window

**onViewOpen**:
* create and register a new view instance
**onViewClose**: 
* destroy and unregister view instance
**onViewUpdate**: 
* store new size on view instance, compute if view need new interval, look for cache, request datastore if needed

**onConnectedDataOpen**: 
* store as listened data (with windowId), ask to dc for subscription
**onConnectedDataClose**: 
* if was the only window listening, unstore as listened data, ask to dc for unsubscription

**onDcPull**:
* unprotobuferized DcServerMessage and pass message to one of following controller
**onDcResponse**:
* find, unregister and call the previously registered callback for message.id 
**onNewDataMessage**:
* if 'realtime': look for known interval for this data and add to cache
* if not: add to cache, if 'finished' mark interval as fully received
* both: loop on each view and pass new data
**onDomainResponse**: 
* store domain

**onHscTimebarUpdate**: 
* store new tb state, only on startup to emulate the real Qt TB
**onTimeBarUpdate**: 
* store new tb state, loop on each view and pass them the state

## View types

Each GPCCHS view is stored in separate component and expose the following components:
* HSC (window)
  - View container
  - View component and sub component
  - Editor container
  - Editor component and sub component
* HSC (main)
  - getConnectedDataFromDocument
  - getConnectedDataFromStore
  - schema.json
* HSS
  - View class with methods: 
    * onViewOpen: 
      - read timebar
      - look for cache
      - request missing interval to DC
      - send cache to view
      - persist current display interval in view instance (=> when it should be used?)
    * onTimebarUpdate:
      - compute missing interval(s) for new interval (based on current display interval)
      - look for cache
      - request missing interval
      - send cache to view
      - persist current display interval in view instance  (=> when it should be used?)
    * onViewUpdate:
      - save new view dimension in view instance (=> for futur complex sampling)
    * onNewData:
      - read timebar
      - if received data concern this view and is in expected interval send to view
    * each view instance apply filters AND buffer data sending to view [AND sample data to send to view]
  
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

 - if protobuf has 'finish' field:
   - set corresponding **requestedIntervals** as received

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
