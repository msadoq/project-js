# TODO

Only list expected tasks for PBF shipping of end of october.

## Global

* [ ] Launch procedure, stop procedure, process on unexcepted stop of one component
* [ ] Finalize LPISIS packaging constrains implementation (Matthieu)

## GPCCHSS (Node.js)

* [ ] Communication with real-timebar and open workspace process
* [ ] Finalize DC communications
  - [ ] Implement new ZeroMQ/protobuf pattern (Adrien)
  - [ ] Fix tests (Adrien)
  - [ ] Migrate stub and data helpers (Adrien ?)
  - [ ] Test every LPISIS parameter type conversion (C++ types to Javascript)
  - [ ] Envisage to fork in child_process the HSS DC stub (Damien)
  - [ ] Envisage to try/catch every ZeroMQ/protobuf operation
* [ ] Controller
  * [ ] onDcData
  * [ ] onTimebarUpdate
  * [ ] onClientOpen
  * [ ] onClientClose
  * [ ] onParameterSubscribe
  * [ ] onParameterUnsubscribe
  * [ ] onViewBecomeVisible
  * [ ] onViewBecomeInvisible
* [ ] View types, implement each controller call with specific logic for each view type
  * [ ] PlotView
  * [ ] TextView
* [ ] (opened) Views management
* [ ] (opened) Parameters management
* [ ] View management
* [ ] Cache Management (Renaud)
  - [ ] CacheJSON
  - [ ] Intervals
  - [ ] Cache invalidation automatic mechanism
* [ ] Timebar play mode upcoming bufferisation (ask for more than immediately needed)
* [ ] Implement domains list retrieving from DC and storing on HSS launch (Adrien)
* [ ] Analyze, measure and test and the LokiJS index for cache dataId and interval (Renaud)
* [ ] LPISIS protobuf and types converters code generation (Adrien)
* [ ] Implement data filtering on server-side view instance
* [ ] Documents schema finalization (Philippe, Audrey)
  - [ ] no UC first
  - [ ] remove data node
  - [ ] clarification on path vs. oId
  - [ ] on entryPoint configuration add a "type" to separate simple parameter and formula (and formula=>content)
  - [ ] add title on page and window
  - [ ] update schemas, validation helper, fixtures and tests
* [ ] Correct support of path and oId in documents (Phillipe ?)
* [ ] [Add HSC stub (reaction to new client, new view, new param to listen, view closing)]
* [ ] Finalize timebar stub (reaction to new client, new view, new param to listen, view closing) (Audrey)
* [ ] Implement a clean log and error channel to files (Damien)
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)

## GPCCHSC (Electron)

* [ ] Workspace opening procedure
  - [ ] Factorize an helper to transform a workspace and associated files in redux compliant tree
  - [ ] Same from redux to workspace document format
  - [ ] Mount on client side
  - [ ] Implement following process: HSS send to HSC a workspace path, HSC read and transform documents
* [ ] Finalize page customizable layout implementation
* [ ] Finalize windows, pages, views add/remove/mount/unmount/updateGeometry/focus reducers and actions
* [ ] Implement <EntryPointsContainer/> for triggering DC realtime un/subscription
* [ ] Implement <PlotView/>
* [ ] Implement <TextView/>
* [ ] Pass realtime dimensions to each view (e.g.: <WithProvider/>)
* [ ] Customize electron menu bar
* [ ] Implement a websocket connection by windows and add a correct dispatching logic on HSS side
* [ ] IHM design and cleanup
* [ ] Complete README.md (lint, quality and coverage, stub  commands usage) (Damien)
* [ ] Code review and cleaning (convention, comments, TODO , small optimizations) (Damien)
  
## Postponed

* [ ] Replace Protobufjs with module that use a C++ parser
* [ ] Add eslint pre-commit hook
* [ ] Implement buffering on server-side view instance data sending to client 
* [ ] Envisage removing express from HSC to use webpack server instead
* [ ] Hot reload in main process https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Envisage replacing stockchart with https://github.com/recharts/recharts
