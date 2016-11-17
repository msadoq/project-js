# GPCCHS SERVER

Desktop visualisation application for ISIS project.

## Installation

Clone the project and switch to client folder:
> cd /data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/server/src/impl/js/server

Copy .env file:
> cd .env.example .env

Install or update dependencies:
> npm install

# Launching project:

> npm start

## Other procedures

Run unit tests:
> npm test

Check the project source code linting:
> npm run lint

Check the code coverage:
> npm run coverage

Updating primus and uws client code:

For compatibility reasons the websocket client library for primus/uws couldn't be compiled at runtime on HSC.
This file should be versionned. 
After updating primus/uws version on HSS you should regenerate the client module with this command:

> npm run build-primus-client
