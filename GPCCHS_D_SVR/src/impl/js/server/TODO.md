# TODO

List of tasks remaining in GPCCHS:

* Envisage a controller to handle communication between
  - websocket incoming view modification
  - timebar incoming modification
  - dc subscription outcoming (from view websocket)
  - dc incoming (to view websocket)
  - (loki cache search and save)
* Go on on dataCache refactoring
* Stubs
  - we should stub DC (push, realtime, archive)
  - we should stub HSC (new connection (=receive data), remove connection, update view)
  - we should stub TB (timebar change)
* Add eslint pre-commit hook
* Uniformize dataFullName and fulldataId and decide if transmitted to DC
* Uniformize sessionId and session and analyse if systematic
* Apply data *buffering* (100ms) and *filtering* on HSS websocket abstract  

* Application launching procedure
  - On application launch ask DC for "domains"
  - Application launching handling in GPCCHS (timebar, explorer, electron)
  - Application stopping handling in GPCCHS (timebar, explorer, electron, ZeroMQ, primus, express, ...)
  - Add file picker step (if no workspace passed in param)
* Application exit procedure
  - Close DC, TB, HSC and exit HSS
