# TODO

List of tasks remaining in GPCCHS:

* Go on on dataCache refactoring
* Stub HSC HSC (new connection (=receive data), remove connection, update view)
* Add eslint pre-commit hook
* Apply data *buffering* (100ms) and *filtering* on HSS websocket abstract
* Replace protobufjs module with module that use a C++ parser

* Application launching procedure
  - On application launch ask DC for "domains"
  - Application launching handling in GPCCHS (timebar, explorer, electron)
  - Application stopping handling in GPCCHS (timebar, explorer, electron, ZeroMQ, primus, express, ...)
  - Add file picker step (if no workspace passed in param)
* Application exit procedure
  - Close DC, TB, HSC and exit HSS
* What about error/exception channel
  - try catch around zmq and protobuf?
* Enforce loki with index on localId and timestamp
* lpisis deserialization code generation
* introduce helper to handler refactor zmq rep/req to have a real RPC API
* fork stub in child_process?
* improve README by adding lint and coverage commands