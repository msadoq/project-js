# GPCCHS SERVER

Desktop visualisation application for ISIS project.

Server is launched by client electron main process. Go to ../../../../../client/src/impl/js/client
and look for README.md

## Other procedures

Run unit tests:
> npm test

Run end to end tests:
> npm run e2e

It forks a HSS server on PORT 3001, and run tests against it.

It's also possible to run e2e tests on a existing HSS server by defining `E2E_URL` and `PORT` environment variable.
Example:
> E2E_URL=http://localhost PORT=3000 npm run e2e

Check the project source code linting:
> npm run lint

Check the code coverage:
> npm run coverage

Updating primus and uws client code:

For compatibility reasons the websocket client library for primus/uws couldn't be compiled at runtime on HSC.
This file should be versionned.
After updating primus/uws version on HSS you should regenerate the client module with this command:

> npm run build-primus-client
