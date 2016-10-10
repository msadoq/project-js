# TODO

Only list expected tasks for PBF shipping of end of october.

## Questions

* [ ] Francois
  * [ ] Wildcard: we can subscribe *n* parameters for the same entryPoint, what we should do with the *n* incoming values (TextView the first, PlotView ?)?
  * [ ] Data sampling
* [damien] Send new DC API to Matthieu and Remy
* [ ] Email to ask DS feature, lastValueBefore date filter (for TextView and MimicView) and sort+limit+offset
* [ ] Change branch R7S2
* [olivier] Write SDD
* [olivier] Open issue on Mantis for computing library 
* [adrien] Open issue on Mantis for data sampling
* [adrien] Open issue on Mantis for getLast before date

## Global

* [matthieu] Launch procedure, stop procedure, unexcepted stop of one component (Matthieu)
* [matthieu] Finalize LPISIS packaging constrains implementation (Matthieu)
* [olivier] Lauching VIMA with timebar only OR implement a limited timebar in HSC (Olivier/Audrey)

## GPCCHSS (Node.js)

* [adrien] DC protocol refactoring
* [renaud] DC timebasedQuery modification (filter=>settings{filters,sort,limit})
* [ ] Prevent exception when client close: "Error: This response corresponds to no queryId"
* Profiling
  - [ ] CacheJson: test AVLTree instead of Loki for cache retrieving/insertion OR our proper data structure DataStructure{[order],{key:{value}}
  - [aziz] Test and profile LokiJS index auto update https://github.com/techfort/LokiJS/issues/477
* [ ] Cache invalidation /!\

## GPCCHSC (Electron)

* [alex] A complete workspace with 2 windows, 3 pages, 16 plots lines, 300 text params
* [ ] Cache invalidation /!\
* DataManager
  - [x] sync (actor) method that compute dataMap and missing interval and request data
  - [x] outcoming queries reducer and actions
  - [audrey] incoming data reducer and actions
  - [ ] ViewDataContainer
  - [ ] tests and profiling
* Implement <PlotView/>
  - [ ] Implement react-stock-chart for PBF
  - [ ] Implement chart.js and react wrapper for more evolutive chart cots
  - [ ] Test live sampling https://www.npmjs.com/package/simplify-path
* Implement <TextView/>
  - [julien] HTML to React with https://github.com/wrakky/react-html-parser
* [ ] Tree refactoring (Damien)
  - impl/js/client|common|server
  - constants, ws event type, filter operator enum values

## Postponed

* [ ] Sync with erb: 0b0e19c74518fc97843e9bcb393086aa9a7ad616 (Damien)
* [ ] Track every HSS "throw" on HSS and catch them accordingly
* [ ] Test every LPISIS parameter type conversion (C++ types to Javascript)
* [ ] Improve window closing by implementing a confirmation box with WS disconnection
* [ ] Fix launching warning on document.write injection by adding cross origin policy
* [ ] Filepicker on start (root on data/)
* [ ] Persist window geometry and focus in Redux
* [ ] Improve main process debugging by try-catching on ready logic
* [ ] Add robustness in every HSS/client controllers by controlling HSC input
* [ ] LPISIS protobuf and types converters code generation (Adrien)
* [ ] Envisage to fork in child_process the HSS DC stub (Damien)
* [ ] Webpackize the HSS code and study C++ module portability
* [ ] Add eslint pre-commit hook
* [ ] Envisage removing express from HSC to use webpack server instead
* [ ] Hot reload in main process https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Fix Primus node.js client generation bug and use C++ also on client side: https://github.com/primus/primus#connecting-from-the-server
* [ ] Move timebars on root level in documents (Audrey)
* [ ] Implement a clean log and error channel (with bridge)
- [ ] Replace Protobufjs with module that use a C++ parser (https://github.com/fuwaneko/node-protobuf or google C++ wrapped by us)
* [ ] Timebar play mode upcoming bufferisation (ask for more than immediately needed)
* [ ] Convert redux window/page/view to workspace document format
* [ ] Correct support of path and oId in documents, maybe required FMD call
* [ ] Complete README.md: lint, quality and coverage, stub  commands usage... (Damien)
* [ ] Code review and cleaning: convention, comments, TODO , small optimizations... (Damien)