# TODO

Only list expected tasks for PBF shipping of end of october.

## Global

* [ ] Launch procedure, stop procedure, process on unexcepted stop of one component
* [ ] Finalize LPISIS packaging constrains implementation (Matthieu)
* [ ] Lauching VIMA with timebar only (RISK!)
* [ ] Wildcard: we can subscribe *n* parameters for the same entryPoint, what we should do with the *n* incoming values (TextView the first, PlotView ?)?
* [ ] TextView displayed value (the last known before currentTime? until when?)
* [ ] Study data sampling ()https://www.npmjs.com/package/simplify-path)

## GPCCHSS (Node.js)

* Finalize DC communications
  - [x] Implement new ZeroMQ/protobuf pattern (Adrien)
  - [x] Fix tests (Adrien)
  - [x] Migrate stub and data helpers (Renaud)
  - [ ] Envisage to try/catch every ZeroMQ/protobuf operation (Damien)
* Controller
  * [ ] onClientOpen (Damien)
  * [ ] onClientClose (Damien)
  * [ ] onWindowOpen
  * [ ] onWindowClose
  * [ ] onConnectedDataOpen (Renaud)
  * [ ] onConnectedDataClose (Renaud)
  * [ ] onViewOpen
  * [ ] onViewClose
  * [ ] onViewUpdate
  * [x] onDcPull (Renaud)
  * [x] onDcResponse (Renaud)
  * [x] onNewDataMessage (Renaud)
  * [ ] onDomainResponse (Renaud)
  * [ ] onTimeBarUpdate (Audrey)
* [ ] View types
  * [ ] PlotView
    - [ ] onTimebarUpdate
    - [ ] onNewData
    - [ ] onDimensionUpdate
  * [ ] TextView
    - [ ] onTimebarUpdate
    - [ ] onNewData
* [ ] Cache Management (Renaud)
  - [x] CacheJSON
  - [x] ConnectedData
  - [ ] Cache invalidation automatic mechanism
* [ ] Domain management
  - [ ] Implement list retrieving from DC HSS launch
  - [ ] Add a module to store domain with accessor
  - [ ] Add logic for domain wilcarding (.get, .getBy(pattern))
  - [ ] Use in onConnectedDataOpen and onConnectedDataClose
* [ ] Analyze, measure and test and the LokiJS index for cache dataId and interval (Renaud)
* [ ] LPISIS protobuf and types converters code generation (Adrien)
* [ ] Implement data filtering on server-side view instance
* [ ] Documents schema finalization (Philippe, Audrey)
  - [x] add title on page and window
  - [x] update schemas, validation helper, fixtures and tests
* [ ] Correct support of path and oId in documents (Phillipe)
* [ ] [Add HSC stub (reaction to new client, new view, new param to listen, view closing)]
* [ ] Finalize timebar stub (reaction to new client, new view, new param to listen, view closing) (Audrey)
* [ ] Implement a clean log and error channel to files (Damien)
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)
* [ ] Plot sampling algo (Philippe)
* [ ] Communication with real-timebar and open workspace process

## GPCCHSC (Electron)

* [x] Implement a websocket connection by windows and add a correct dispatching logic on HSS side (Damien)
* Workspace opening procedure
  - [x] Factorize an helper to transform a workspace and associated files in redux compliant tree (Audrey)
  - [x] Mount on client side (Audrey)
* [x] Finalize page customizable layout implementation (Damien)
* [x] Finalize windows, pages, views add/remove/mount/unmount/updateGeometry/focus reducers and actions (Damien)
* [x] Implement <ConnectedDataContainer/> for triggering DC realtime un/subscription
* [=] De-duplicate connectedData for a given windows (windowReducer.getWindowConnectedData) (Audrey) 
* [ ] Improve main process debugging by try-catching on ready logic (Damien)
* [ ] Fix the debug module non-logging in renderer (Damien)
* Implement <PlotView/>
  - [ ] container
  - [ ] component
* [ ] Implement <TextView/>
  - [ ] container
  - [ ] component
* [ ] Pass realtime dimensions to each view (e.g.: <WithProvider/>)
* [ ] Customize electron menu bar + add actions in menu bar: new window, new view (for current focused page)
* [x] Merge Aziz branch
* [x] Merge Editor branch
* [ ] To improve stability add an "page close" handler in window and set ws redux state as disconnected
* [ ] Sync with erb: 0b0e19c74518fc97843e9bcb393086aa9a7ad616
* [ ] IHM design and cleanup
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)

## Postponed

* [ ] Convert redux window/page/view to workspace document format (Audrey)
* [ ] Envisage to fork in child_process the HSS DC stub (Damien)
* [ ] Test every LPISIS parameter type conversion (C++ types to Javascript)
* [ ] Webpackize the HSS code and study C++ module portability
* [ ] Replace Protobufjs with module that use a C++ parser
* [ ] Add eslint pre-commit hook
* [ ] Implement buffering on server-side view instance data sending to client 
* [ ] Envisage removing express from HSC to use webpack server instead
* [ ] Hot reload in main process https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Envisage replacing stockchart with https://github.com/recharts/recharts
* [ ] Fix Primus node.js client generation bug and use C++ also on client side: https://github.com/primus/primus#connecting-from-the-server
* [ ] Timebar play mode upcoming bufferisation (ask for more than immediately needed)