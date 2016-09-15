/* eslint-disable no-unused-expressions */
const {
  should,
} = require('../utils/test');
const {
  validateWsJson,
  validateTvJson,
  validateTbJson,
  validatePvJson,
  validatePgJson,
} = require('../schemaManager');

const emptyData = '';

const dataWs = require('./examples/WS.example');
const dataTb = require('./examples/TB.example');
const dataPv = require('./examples/PV.example');
const dataTv = require('./examples/TV.example');
const dataPg = require('./examples/PG.example');
const dataMv = require('./examples/MV.example');
const dataWsMis = require('./examples/WS.example.mis');
const dataTbMis = require('./examples/TB.example.mis');
const dataPvMis = require('./examples/PV.example.mis');
const dataTvMis = require('./examples/TV.example.mis');
const dataPgMis = require('./examples/PG.example.mis');
const dataMvMis = require('./examples/MV.example.mis');


function checkErrorObject(obj) {
  for (let i = 0; i < obj.length; i++) {
    obj[i].should.be.an('object');
    obj[i].should.have.a.property('keyword');
    obj[i].should.have.a.property('dataPath');
    obj[i].should.have.a.property('schemaPath');
    obj[i].should.have.a.property('params');
    obj[i].should.have.a.property('message');
  }
}

describe('schemaManager/validateJson', () => {
  describe('Workspace', () => {
    it('Valid', () => {
      should.not.exist(validateWsJson(dataWs));
    });
    it('Empty', () => {
      const msg = validateWsJson(emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateWsJson(dataWsMis);
      msg.length.should.equal(12);
      checkErrorObject(msg);
    });
  });
  describe('Timebar', () => {
    it('Valid', () => {
      const err = validateTbJson(dataTb);
      should.not.exist(err);
      should.not.exist(validateTbJson(dataTb));
    });
    it('Empty', () => {
      const msg = validateTbJson(emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateTbJson(dataTbMis);
      msg.length.should.equal(8);
      checkErrorObject(msg);
    });
  });
  describe('PlotView', () => {
    it('Valid', () => {
      should.not.exist(validatePvJson(dataPv));
    });
    it('Empty', () => {
      const msg = validatePvJson(emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validatePvJson(dataPvMis);
      msg.length.should.equal(3);
      checkErrorObject(msg);
    });
  });
  describe('TextView', () => {
    it('Valid', () => {
      should.not.exist(validateTvJson(dataTv));
    });
    it('Empty', () => {
      const msg = validateTvJson(emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateTvJson(dataTvMis);
      msg.length.should.equal(5);
      checkErrorObject(msg);
    });
  });
  describe('MimicView', () => {
    it('Valid', () => {
      should.not.exist(validateTvJson(dataTv));
    });
    it('Empty', () => {
      const msg = validateTvJson(emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateTvJson(dataTvMis);
      msg.length.should.equal(5);
      checkErrorObject(msg);
    });
  });
  describe('Page', () => {
    it('Valid', () => {
      should.not.exist(validatePgJson(dataPg));
    });
    it('Empty', () => {
      const msg = validatePgJson(emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validatePgJson(dataPgMis);
      msg.length.should.equal(3);
      checkErrorObject(msg);
    });
  });
});
