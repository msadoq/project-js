# ARCHITECTURE

## Sub-components
* HS Server (node, HSS)
* HS Client (electron, HSC)
* TimeBar (QT, TB)
* Data Communication (C++, DC)

## Launching
On application start the LPISIS launch an HSS instance with a set of free port and an optional
workspace document path.
HSS read workspace, pages and views document and launch instance of: TB, DC and HSC.

## Stopping
On application close (by user from HSC or on SIGTERM to HSS or HSC) stops DC, TB, HSC and from HSS.
[question] should DC unsubscribe from datastore archive and from tbd consumer pub/sub on close?

## Inter-components communication
* HSS->DC (ZeroMQ/Protobuf)
  - timebar_update: inform DC with the new TB interval for realtime data filtering
  - parameters_update: inform DC with the whole list of parameter for realtime data filtering
  - query: ask to DC to request datastore archive for data (see subscription)
* DC->HSS (ZeroMQ/Protobuf)
  - realtime_data: data from TBD consumer pub/sub
  - query_data: data from datastore archive
* TB->HSS (ZeroMQ/Protobuf)
  - timebar_update: inform HSS with the new TB interval
* HSS->HSC (Websocket)
  - timebar_update: inform HSC with the new TB interval
  - parameter_data: give HSC a new set of data
* HSC->HSS (Websocket)
  - view_update: inform HSS with new view dimension and view visibility
* HSC/HSS (REST)
  - document creation, opening, saving

## HSS
HSS should have full knowledge of open view and visible data in HSC in realtime.
HSS is responsible for listening TB (interval, play mode for buffering).
HSS is responsible for listening HSC (views dimension and visibility).
HSS is responsible to determine:
- which data is in cache
- which data to query to DC
- which realtime data to filter on DC

## HSC
```
1 electron instance
 |_ 1 websocket
 |_ **n** windows
    |_ **n** pages
      |_ **n** views (containerized WebView: http://electron.atom.io/docs/api/web-view-tag/)
        |_ 1 websocket connection
        |_ **n** subscription ID
```

Redux store:
* 1 redux store inited by main process
* 1 redux store by window (with filtering logic on document)
* Each view is rendered as iFrame (fork for WebView support: 
     https://github.com/ryanseddon/react-frame-component or 
     https://www.npmjs.com/package/react-iframe) and receive propsUpdate.
