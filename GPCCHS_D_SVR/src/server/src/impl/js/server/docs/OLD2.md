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

**onOpen**:
* send 'authenticated' answer to client (HSC lifecycle)
**onClose**: 
* unsubscribe every connectedData, empty cacheJSON/connectedData

**onWindowOpen**: 
* send 'authenticated' answer to client (HSC lifecycle)
**onWindowClose**: 
* (for the closing window) unsubscribe every connectedData, empty cacheJSON/connectedData

**onConnectedDataOpen**: 
* store as listened data (with windowId), ask to dc for subscription
**onConnectedDataClose**: 
* if was the only window listening, unstore as listened data, ask to dc for unsubscription

**onMessage**:
* unprotobuferized DcServerMessage and pass message to one of following controller
**onResponse**:
* find, unregister and call the previously registered callback for message.id
**onNewDataMessage**:
* if 'realtime': look for known interval for this data and add to cache
* if not: add to cache, if 'finished' mark interval as fully received
* both: loop on each view and pass new data
**onDomainQuery**: 
* request domains list to DC
**onDomainData**: 
* store domain, forward to HSC

**onViewOpen**:
* create and register a new view instance
**onViewClose**: 
* destroy and unregister view instance

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
    * onViewClose:
      - unsubscribe realtime
      - [cleanup cache]
      - cleanup memory
    * onTimebarUpdate:
      - compute missing interval(s) for new interval (based on current display interval)
      - look for cache
      - request missing interval
      - send cache to view
      - persist current display interval in view instance  (=> when it should be used?)
    * onNewData:
      - read timebar
      - if received data concern this view and is in expected interval send to view
    * each view instance apply filters AND buffer data sending to view [AND sample data to send to view]
