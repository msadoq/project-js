# TODO

Only list expected tasks for PBF shipping of end of october.

## Global

* [ ] Launch procedure, stop procedure, process on unexcepted stop of one component
* [ ] Finalize LPISIS packaging constrains implementation (Matthieu)
* [ ] Lauching VIMA with timebar only (RISK!)

## GPCCHSS (Node.js)

* [ ] Communication with real-timebar and open workspace process
* [ ] Finalize DC communications
  - [x] Implement new ZeroMQ/protobuf pattern (Adrien)
  - [x] Fix tests (Adrien)
  - [ ] Migrate stub and data helpers (Renaud)
  - [ ] Test every LPISIS parameter type conversion (C++ types to Javascript)
  - [ ] Envisage to fork in child_process the HSS DC stub (Damien)
  - [ ] Envisage to try/catch every ZeroMQ/protobuf operation (Damien)
* [ ] Controller
  * [ ] onClientOpen (Damien)
  * [ ] onClientClose (Damien)
  * [ ] onConnectedDataOpen (Damien)
  * [ ] onConnectedDataClose (Damien)
  * [x] onDcPull (Renaud)
  * [ ] onDomainResponse
  * [x] onNewDataMessage (Renaud)
  * [x] onDcResponse (Renaud)
* [ ] View types
  * [ ] PlotView
    - [ ] onTimebarUpdate
    - [ ] onNewData
    - [ ] onDimensionUpdate
  * [ ] TextView
    - [ ] onTimebarUpdate
    - [ ] onNewData
* [ ] Views management
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
  - [ ] add title on page and window
  - [ ] Remove unused key: showBorder, kind:relative, ...
  - [ ] update schemas, validation helper, fixtures and tests
* [ ] Correct support of path and oId in documents (Phillipe ?)
* [ ] [Add HSC stub (reaction to new client, new view, new param to listen, view closing)]
* [ ] Finalize timebar stub (reaction to new client, new view, new param to listen, view closing) (Audrey)
* [ ] Implement a clean log and error channel to files (Damien)
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)
* [ ] Plot sampling algo (Philippe)
* [ ] Timebar play mode upcoming bufferisation (ask for more than immediately needed)

## GPCCHSC (Electron)

* [ ] Improve main process debugging by try-catching on ready logic (Damien)
* [ ] Fix the debug module non-logging in renderer (Damien)
* [ ] Workspace opening procedure
  - [ ] Factorize an helper to transform a workspace and associated files in redux compliant tree (Audrey)
  - [ ] Same from redux to workspace document format (Audrey)
  - [x] Mount on client side (Audrey)
* [x] Finalize page customizable layout implementation (Damien)
* [x] Finalize windows, pages, views add/remove/mount/unmount/updateGeometry/focus reducers and actions (Damien)
* [x] Implement <ConnectedDataContainer/> for triggering DC realtime un/subscription
* [ ] Implement <PlotView/>
* [ ] Implement <TextView/>
* [ ] Pass realtime dimensions to each view (e.g.: <WithProvider/>)
* [ ] Customize electron menu bar + add actions in menu bar: new window, new view (for current focused page)
* [x] Implement a websocket connection by windows and add a correct dispatching logic on HSS side (Damien)
* [ ] IHM design and cleanup
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)
* [x] Merge Aziz branch
* [x] Merge Editor branch
* [ ] To improve stability add an "page close" handler in window and set ws redux state as disconnected

## Common

* [ ] View type abstraction
  - [ ] React container/component
  - [ ] Editor React container/component
  - [ ] Redux converter (both way), actions and reducers
  
## Postponed

* [ ] Webpackize the HSS code and study C++ module portability
* [ ] Replace Protobufjs with module that use a C++ parser
* [ ] Add eslint pre-commit hook
* [ ] Implement buffering on server-side view instance data sending to client 
* [ ] Envisage removing express from HSC to use webpack server instead
* [ ] Hot reload in main process https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Envisage replacing stockchart with https://github.com/recharts/recharts
* [ ] Fix Primus node.js client generation bug and use C++ also on client side: https://github.com/primus/primus#connecting-from-the-server
