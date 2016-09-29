# TODO

Only list expected tasks for PBF shipping of end of october.

## Questions

* [ ] Wildcard: we can subscribe *n* parameters for the same entryPoint, what we should do with the *n* incoming values (TextView the first, PlotView ?)?
* [ ] TextView displayed value (the last known before currentTime? until when?)

## Global

* [=] Launch procedure, stop procedure, unexcepted stop of one component (Matthieu)
* [=] Finalize LPISIS packaging constrains implementation (Matthieu)
* [=] Lauching VIMA with timebar only OR implement a limited timebar in HSC (Olivier/Audrey)
* [ ] Complete README.md: lint, quality and coverage, stub  commands usage... (Damien)
* [ ] Code review and cleaning: convention, comments, TODO , small optimizations... (Damien)

## GPCCHSS (Node.js)

* [=] Analyze, measure and test and the LokiJS index for cache dataId and interval, https://github.com/techfort/LokiJS/issues/477 (Damien)
* Controllers
  * [ ] onViewUpdate (store new configuration)
  * [=] onViewQuery (Renaud)
* [ ] Move localId generation from HSS to HSC in <Subscription/> and <View/> (Damien)
* [ ] Implement data filtering on server-side view instance
* [ ] LPISIS protobuf and types converters code generation (Adrien)
* [ ] Test every LPISIS parameter type conversion (C++ types to Javascript) (Adrien)
* [ ] Track every "throw" on HSS and catch them accordingly
* [ ] Add robustness in every controller by controlling HSC input
* [ ] Cache invalidation automatic mechanism

Renaud
* [x] connectedData Model: fix retrieveMissingIntervals and update tests
* [x] connectedData Model: store merge of both requested and received intervals into a separate entry
* [ ] onNewDataMessage: separate in two controllers: onRealtimeData, onArchiveData
  - [ ] Don't de-protobuf in first _.map (only get timestamp), de-protobuf parameter value at last moment
  - [ ] In onArchiveData consider data as ordered (take first and last timestamp, search for this interval existence, insert)
  - [=] In onRealtimeData list and order timestamp, implement a method that walk known intervals with timestamp list and return only ones that are in known interval .areTimestampInKnownIntervals([timestamp]) => [timestamp]  
  - [=] connectedDataModel: change .addRecord() to .addRecords()
* [ ] View type onNewData: implement localId filtering, displayed interval filtering, filter, select field and send [[timestamp, value]]
* [ ] onViewQuery/onNewDataMessage: test AVLTree instead of Loki for cache retrieving/insertion OR our proper data structure DataStructure{[order],{key:{value}}
* [ ] Profiling: rename errorHandler=>execController, only on 'end' controllers

## GPCCHSC (Electron)

* Implement <PlotView/>
  - [ ] container
  - [ ] component (chart)
  - [ ] Prototype and implement a chart library
  - [ ] https://www.npmjs.com/package/simplify-path
* [ ] Implement <TextView/>
  - [ ] container
  - [ ] component
  - [ ] https://github.com/wrakky/react-html-parser
* [ ] Persist window geometry and focus in Redux
* [ ] Improve window closing by implementing a confirmation box with WS disconnection
* [ ] Pass realtime dimensions to each view (react-grid-layout/build/components/WidthProvider.js.flow, react-dimensions, https://github.com/souporserious/react-measure)
* [ ] Replace tabs with reactjs/react-tabs

Audrey
* [ ] Re-implement documents/workspace unit test (Audrey)

Aziz
* [ ] TextView parsing to React component
* [ ] Filepicker on start (root on data/)

Alexandra
* [=] Customize electron window menu bar (Alexandra)
* [=] Add a clean "error" page when unable to connect to server or when DC stub is off (Alexandra)

Damien
* [ ] connectedData/decorate.js: don't take offset in consideration when called from forWindow()
* [ ] Implement ConnectedDataContainer in <Page/> and not in <Views/>
* [ ] NewData channel handling in client
* [ ] Remove mutations/connectedData with a sub-reducer in views
* [ ] Sync with erb: 0b0e19c74518fc97843e9bcb393086aa9a7ad616
* [ ] Improve main process debugging by try-catching on ready logic
* [ ] Fix launching warning on document.write injection by adding cross origin policy
* [ ] Implement reselect on connectedData
* [ ] connectedData/domains.js: add reselect
* [ ] connectedData/forView.js: test
* [ ] connectedData/forWindow.js: move .extractFromWindow() in selector
* [ ] connectedData/queries.js: test
* [ ] connectedData/queries.js: handle view type to request only needed value (everything for plot, lower->current for text)
* [ ] connectedData/wildcard.js: memoize .generate()
* [ ] Analyse connectedData module, complete tests, same for selectors and others
* [ ] HSC tree refactoring:
  - app=>lib
  - main=>mainProcess + window=>windowProcess
  - PageContent=>Content
  - utils=>common
  - connectedData=>dataConsumption
  - store/mutations=>store/reducers|actions|types.js

## Postponed

* [ ] Replace localId with unique number id to save Loki memory
* [ ] Envisage to fork in child_process the HSS DC stub (Damien)
* [ ] Webpackize the HSS code and study C++ module portability
* [ ] Replace Protobufjs with module that use a C++ parser
* [ ] Add eslint pre-commit hook
* [ ] Envisage removing express from HSC to use webpack server instead
* [ ] Hot reload in main process https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Envisage replacing stockchart with https://github.com/recharts/recharts or https://github.com/reactjs/react-chartjs
* [ ] Fix Primus node.js client generation bug and use C++ also on client side: https://github.com/primus/primus#connecting-from-the-server
* [ ] Move timebars on root level in documents (Audrey)
* [ ] Implement a clean log and error channel (with bridge)

## v2
* [ ] Timebar play mode upcoming bufferisation (ask for more than immediately needed)
* [ ] Convert redux window/page/view to workspace document format (Audrey)
* [ ] Correct support of path and oId in documents, maybe required FMD call
