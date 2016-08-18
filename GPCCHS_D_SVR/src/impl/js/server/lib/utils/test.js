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
