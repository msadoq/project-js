# TODO

Only list expected tasks for PBF shipping of end of october.

## Questions

* [ ] Francois
  * [ ] Wildcard: we can subscribe *n* parameters for the same entryPoint, what we should do with the *n* incoming values (TextView the first, PlotView ?)?
    - [ ] Propose to change the wildcard handling by viewType (textView only select the first domain and timeline that match)
  * [ ] Data sampling
  * PBF workspace parameter types
* [ ] Email to ask DS feature, lastValueBefore date filter (for TextView and MimicView) and sort+limit+offset
* [ ] Propose a datastore feature to make query with multiple domainId and sessionId
* [olivier] Open issue on Mantis for computing library
* [adrien] Open issue on Mantis for getLast before date

* [ ] Tree refactoring (Damien)
  - impl/js/client|common|server
  - constants, ws event type, filter operator enum values

## Postponed

LPISIS protobuf and types converters code generation
Add debug page on client with HSS REST infos and current dataMap
Sync with erb: 0b0e19c74518fc97843e9bcb393086aa9a7ad616
Track every HSS "throw" on HSS and catch them accordingly
Improve main process debugging by try-catching on ready logic
Test every LPISIS parameter type conversion (C++ types to Javascript)
Improve window closing by implementing a confirmation box with WS disconnection
Fix launching warning on document.write injection by adding cross origin policy
Filepicker on start (root on data/)
Persist window geometry and focus in Redux

* [ ] Webpackize the HSS code and study C++ module portability
* [ ] Envisage removing express from HSC to use webpack server instead
* [ ] Hot reload in main process https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Fix Primus node.js client generation bug and use C++ also on client side: https://github.com/primus/primus#connecting-from-the-server
* [ ] Move timebars on root level in documents (Audrey)