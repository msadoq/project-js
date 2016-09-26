# TODO

Only list expected tasks for PBF shipping of end of october.

## Global

* [=] RISK! Launch procedure, stop procedure, process on unexcepted stop of one component
* [=] RISK! Finalize LPISIS packaging constrains implementation (Matthieu)
* [ ] RISK! Lauching VIMA with timebar only OR implement a limited timebar in HSC
* [=] RISK! Wildcard: we can subscribe *n* parameters for the same entryPoint, what we should do with the *n* incoming values (TextView the first, PlotView ?)?
* [ ] RISK! TextView displayed value (the last known before currentTime? until when?)

## GPCCHSS (Node.js)

* [=] Analyze, measure and test and the LokiJS index for cache dataId and interval, https://github.com/techfort/LokiJS/issues/477 (Damien)
* Finalize DC communications
  - [x] Implement new ZeroMQ/protobuf pattern (Adrien)
  - [x] Fix tests (Adrien)
  - [x] Migrate stub and data helpers (Renaud)
* Controller
  * [x] onClientOpen (Renaud)
  * [x] onClientClose (Renaud)
  * [x] onWindowOpen (Renaud)
  * [x] onWindowClose (Renaud)
  * [x] onConnectedDataOpen (Renaud)
  * [x] onConnectedDataClose (Renaud)
  * [ ] onViewOpen
  * [ ] onViewClose
  * [ ] onViewQuery
  * [x] onDcServerMessage (Renaud)
  * [x] onDcResponse (Renaud)
  * [x] onNewDataMessage (Renaud)
    - [x] add test if connected data exists, otherwise exist (update unit test) (Renaud)
  * [x] onDomainResponse (Renaud)
* Timebar
  * [=] Add push socket with TB
  * [=] On HSS reception of TB by HSC forward to TB
  * [=] Add TB forward to HSC from VIMA
  * [=] Implement redux mutation
* View types
  * [ ] PlotView
    - [ ] onTimebarUpdate
    - [ ] onNewData
    - [ ] onDimensionUpdate
  * [ ] TextView
    - [ ] onTimebarUpdate
    - [ ] onNewData
* Cache Management (Renaud)
  - [x] CacheJSON
  - [x] ConnectedData
* Domain management
  - [x] Implement list retrieving from DC HSS launch
  - [x] Add a module to store domain with accessor
* Documents schema finalization (Philippe, Audrey)
  - [x] add title on page and window
  - [x] update schemas, validation helper, fixtures and tests
* [=] Correct support of path and oId in documents, maybe required FMD call (Damien)
* [ ] LPISIS protobuf and types converters code generation (Adrien)
* [ ] Implement data filtering on server-side view instance
* [ ] Finalize timebar stub (reaction to new client, new view, new param to listen, view closing) (Audrey)
* [ ] Add debug routes on HSS: index, connectedData collection, cacheJson collection, domains, timebar, ... (Alexandra)
* [ ] Cache invalidation automatic mechanism
* [ ] Implement a clean log and error channel to files (Damien)
* [ ] Add robustness in every controller by controlling HSC input (Damien)
* [ ] try/catch every controller (Renaud)
* [ ] Track "throw" and catch them accordingly (Damien)
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)

## GPCCHSC (Electron)

* [x] Implement a websocket connection by windows and add a correct dispatching logic on HSS side (Damien)
* Workspace opening procedure
  - [x] Factorize an helper to transform a workspace and associated files in redux compliant tree (Audrey)
  - [x] Mount on client side (Audrey)
* [x] Finalize page customizable layout implementation (Damien)
* [x] Finalize windows, pages, views add/remove/mount/unmount/updateGeometry/focus reducers and actions (Damien)
* [x] Implement <ConnectedDataContainer/> for triggering DC realtime un/subscription
* [x] Merge Aziz branch
* [x] Merge Editor branch
* [x] Take in consideration the WS 'authenticated' anwser in HSC main process lifecycle (Renaud)
* [ ] Analyse connectedData module, complete tests, same for selectors and others (Damien) 
* [ ] Add reselect on connectedData (Damien) 
* [ ] Improve main process debugging by try-catching on ready logic (Damien)
* [ ] Fix the grid layout click capture, add header and allow drag only from header on views (Damien)
* ConnectedData
  - [x] Add selector for domain by wildcard (Audrey)
  - [x] Add selector for timebar by wildcard (Audrey)
  - [x] On connectedData mount and unmount message add explicit domain and session (Damien)
  - [ ] Add connectedData duplication logic with domain and session handling
  - [=] De-duplicate connectedData for a given windows (windowReducer.getWindowConnectedData) (Damien)
  - Subscriptions
    - [x] Rename ConnectedData* to Subscriptions* (Damien)
    - [=] Apply duplication logic and de-duplication (Damien)
  - ConnectedDataQuery
    - [=] Add selector for view to retrieves list of interval to display (connectedData)  
    - [ ] Add logic on componentWillUpdate() to determine missing interval
    - [ ] ... request missing interval
* Implement <PlotView/>
  - [ ] container
  - [ ] component (chart)
  - [ ] Prototype and implement a chart library
  - [ ] https://www.npmjs.com/package/simplify-path
* [ ] Implement <TextView/>
  - [ ] container
  - [ ] component
  - [ ] Dangerously inject dynamised static HTML in view
  - [ ] https://github.com/wrakky/react-html-parser
* [ ] Pass realtime dimensions to each view (e.g.: <WithProvider/>)
* Customize electron window menu bar (Alexandra)
  - Workspace
    - [ ] Save...
    - [ ] Quit
  - Window
    - [ ] everything that is in actual View menu should be append in this menu
    - [ ] Minimize
    - [ ] New
    - [ ] Close
  - Page
    - [ ] Open...
    - [ ] Add
    - [ ] Save...
  - View
    - [ ] Open... (in current page)
    - [ ] Add (in current page)
  - Edit (unchanged)
  - Remove Help
* [ ] Re-implement documents/workspace unit test (Audrey)
* [ ] Move timebars on root level in documents (Audrey)
* [ ] Add a clean "error" page when unable to connect to server or when DC stub is off
* [ ] Improve window closing by implementing a confirmation box with WS disconnection
* [ ] Sync with erb: 0b0e19c74518fc97843e9bcb393086aa9a7ad616
* [=] Implement a monitoring endpoint (event loop timing, memory) (Renaud)
* [ ] IHM design and cleanup (Damien)
* [ ] Fix the debug module non-logging in renderer (Damien)
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)

## Postponed

* [ ] [Add HSC stub (reaction to new client, new view, new param to listen, view closing)]
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