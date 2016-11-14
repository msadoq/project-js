require('dotenv-safe').load();
// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');

// disable HTTP server logs for test run
process.env.HTTP_LOGS = 0;

const chai = require('chai'); // eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const properties = require('chai-properties');
const request = require('supertest'); // eslint-disable-line import/no-extraneous-dependencies

const expressApp = require('../express');

const database = require('../io/loki');


chai.use(properties);

const postApiRequest = (route, data) => request(expressApp)
  .post(route)
  .set('Content-Type', 'application/vnd.api+json')
  .set('Accept', 'application/vnd.api+json')
  .send(JSON.stringify(data));
const getApiRequest = url => request(expressApp)
  .get(url)
  .set('Content-Type', 'application/vnd.api+json')
  .set('Accept', 'application/vnd.api+json');
const shouldBeApiError = (status, title, pointer) => (res) => {
  const body = res.body;
  body.should.be.an('object')
    .that.not.have.property('data');
  body.should.have.a.property('errors')
    .that.is.an('array')
    .and.have.lengthOf(1);
  body.errors[0].should.be.an('object').that.has.properties({
    status,
    title,
    source: {
      pointer,
    },
  });
};

const testPayloads = [];

const testHandler = (...args) => {
  _each(args, (arg) => {
    testPayloads.push(arg);
  });
};

module.exports = {
  should: chai.should(),
  expect: chai.expect,
  request,
  expressApp,
  postApiRequest,
  getApiRequest,
  shouldBeApiError,
  database,
  testHandler,
  testPayloads,
};
