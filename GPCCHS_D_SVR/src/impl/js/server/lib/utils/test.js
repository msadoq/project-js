require('dotenv-safe').load();

// disable HTTP server logs for test run
process.env.HTTP_LOGS = 0;

const chai = require('chai');
const properties = require('chai-properties');
const request = require('supertest');
const expressApp = require('../express');

chai.use(properties);

module.exports = {
  chai,
  should: chai.should(),
  request,
  expressApp,
};
