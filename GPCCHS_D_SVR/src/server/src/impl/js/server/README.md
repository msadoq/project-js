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

> decribe.only('my awesome tests', () => ...
