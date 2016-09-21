# GPCCHS_D_SVR

## Installation and configuration

Once to project is cloned go to this folder and install dependencies:

> npm i

Copy the ``.env.example`` to ``.env`` and edit it to set your local environment:
 
> cp .env.example .env && vi .env

## Launching server

> npm start

## Running test

> npm run test

**Note**: to run only one or some test add the .only directive to your decribe() or it() call:

> decribe('my awesome tests', () => ...

## Updating primus and uws

For compatibility reasons the websocket client library for primus/uws couldn't be compiled at runtime on HSC.
After updating primus/uws version on HSS you should regenerate the client module with this command:

$> npm run build-primus-client
$> cp /tmp/primus.js /...path.to.hsc.project.../client/external

The primus.js file should be versionned. 
