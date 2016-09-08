# TODO

* Redux store is share between all processes (main and renderers), it stores:
 * windows/page/view configuration, geometry and focus
 * main websocket state

* Open real world workspace document example!
  - in main process empty initial state (no window)
  - open websocket, on open send a open workspace message to HSS
  - if receive document : convert and put in redux store (=windows open)
  - else : open file picker

* React/redux
  * [=] Etudier webview electron (http://electron.atom.io/docs/api/web-view-tag/)
  * [ ] Add geometry saving for windows
  * [ ] Add focus and view geometry saving for page
  * [ ] Pass component display size to plotview: https://www.npmjs.com/package/react-dimensions

* [ ] Introduce updeep https://github.com/substantial/updeep
* [ ] Use documents REST routes
* [ ] Add REST abstract
* [ ] Envisage removing express to use webpack server instead
* [ ] Hot reload in main process? https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Envisage replacing stockchart with https://github.com/recharts/recharts
* [ ] Handle SIGTERM from HSS and/or send SIGTERM to HSS
