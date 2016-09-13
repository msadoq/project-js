# TODO

* Redux store is share between all processes (main and renderers), it stores:
 * windows/page/view configuration, geometry and focus
 * main websocket state

* Main
  * [ ] Implement a main websocket adapter, sync with store

* React/redux
  * [=] Add view component w/ https://github.com/STRML/react-grid-layout OR https://github.com/bokuweb/react-resizable-and-movable
  * [=] Etudier webview electron (http://electron.atom.io/docs/api/web-view-tag/)
  * [ ] Add geometry saving for views
  * [ ] Add geometry saving for windows
  * [ ] Add focus saving for page
  * [ ] Pass component display size to plotview: https://www.npmjs.com/package/react-dimensions

* [ ] Introduce updeep https://github.com/substantial/updeep
* [ ] Use documents REST routes
* [ ] Add REST abstract
* [ ] Envisage removing express to use webpack server instead
* [ ] Hot reload in main process? https://github.com/chentsulin/electron-react-boilerplate/issues/360
* [ ] Envisage replacing stockchart with https://github.com/recharts/recharts
* [ ] Handle SIGTERM from HSS and/or send SIGTERM to HSS
