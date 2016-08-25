const {
  should
} = require('../../lib/utils/test');
const {
  validateWsJson,
  validateTvJson,
  validateTbJson,
  validatePvJson,
  validatePgJson
} = require('../../lib/schemaManager/schemaManager');

// input data
// Valid
const dataWs = require('../../lib/schemaManager/examples/WS.example');
const dataTb = require('../../lib/schemaManager/examples/TB.example');
const dataPv = require('../../lib/schemaManager/examples/PV.example');
const dataTv = require('../../lib/schemaManager/examples/TV.example');
const dataPg = require('../../lib/schemaManager/examples/PG.example');
// empty
const emptyData = "";
// Invalid
const dataWsMis = require('../../lib/schemaManager/examples/WS.example.mis');
const dataTbMis = require('../../lib/schemaManager/examples/TB.example.mis');
const dataPvMis = require('../../lib/schemaManager/examples/PV.example.mis');
const dataTvMis = require('../../lib/schemaManager/examples/TV.example.mis');
const dataPgMis = require('../../lib/schemaManager/examples/PG.example.mis');

// Check parameters of error object
function checkErrorObject(obj) {
  /*      msg.should.equal("
  [ { keyword: 'required',\
      dataPath: '.data.attributes.views[1]',\
      schemaPath: '#/allOf/1/required',\
      params: { missingProperty: 'windowState' },\
      message: 'should have required property \'windowState\'' } ");*/

  for (let i = 0 ; i < obj.length ; i++) {
    obj[i].should.be.an('object');
    obj[i].should.have.a.property('keyword');
    obj[i].should.have.a.property('dataPath');
    obj[i].should.have.a.property('schemaPath');
    obj[i].should.have.a.property('params');
    obj[i].should.have.a.property('message');
  }
};

/* eslint-disable no-unused-expressions */

describe('validateJson', () => {
  // Workspace
  describe('Workspace', () => {
    it('Valid', () => {
      should.not.exist(validateWsJson(dataWs));
    });
    it('Empty', () => {
      const msg = validateWsJson(emptyData);
      msg.should.equal("Empty file");
    });
    it('Invalid', () => {
      let msg = validateWsJson(dataWsMis);
      msg.length.should.equal(12);
      checkErrorObject(msg);
    });
  });
  // TimeBar
  describe('Timebar', () => {
    it('Valid', () => {
      const err = validateTbJson(dataTb);
      if (err) console.log(err) ;
      should.not.exist(validateTbJson(dataTb));

    });
    it('Empty', () => {
      const msg = validateTbJson(emptyData);
      msg.should.equal("Empty file");
    });
    it('Invalid', () => {
      let msg = validateTbJson(dataTbMis);
      msg.length.should.equal(8);
      checkErrorObject(msg);
    });
  });
  // PlotView
  describe('PlotView', () => {
    it('Valid', () => {
      should.not.exist(validatePvJson(dataPv));
    });
    it('Empty', () => {
      const msg = validatePvJson(emptyData);
      msg.should.equal("Empty file");
    });
    it('Invalid', () => {
      let msg = validatePvJson(dataPvMis);
      msg.length.should.equal(3);
      checkErrorObject(msg);
    });
  });
  // TextView
  describe('TextView', () => {
    it('Valid', () => {
      should.not.exist(validateTvJson(dataTv));
    });
    it('Empty', () => {
      const msg = validateTvJson(emptyData);
      msg.should.equal("Empty file");
    });
    it('Invalid', () => {
      let msg = validateTvJson(dataTvMis);
      msg.length.should.equal(5);
      checkErrorObject(msg);
    });
  });
  // Page
  describe('Page', () => {
    it('Valid', () => {
      should.not.exist(validatePgJson(dataPg));
    });
    it('Empty', () => {
      const msg = validatePgJson(emptyData);
      msg.should.equal("Empty file");
    });
    it('Invalid', () => {
      let msg = validatePgJson(dataPgMis);
      msg.length.should.equal(3);
      checkErrorObject(msg);
    });
  });
});
