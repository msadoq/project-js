const chai = require('chai');
const should = chai.should();
chai.use(require('chai-properties'));

// process.env.DISABLE_HTTP_LOG = '1';
const request = require('supertest');

const expressApp = require('../app');

module.exports = {
  chai,
  should,
  request,
  expressApp,
};
