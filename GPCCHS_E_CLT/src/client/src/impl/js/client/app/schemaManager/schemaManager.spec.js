/* eslint-disable no-unused-expressions */
const {
  should,
} = require('../utils/test');
const validateJson = require('../schemaManager');

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
      should.not.exist(validateJson('Workspace', dataWs));
    });
    it('Empty', () => {
      const msg = validateJson('Workspace', emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateJson('Workspace', dataWsMis);
      msg.length.should.equal(23);
      checkErrorObject(msg);
    });
  });
  describe('Timebar', () => {
    it('Valid', () => {
      const err = validateJson('Timebar', dataTb);
      should.not.exist(err);
      should.not.exist(validateJson('Timebar', dataTb));
    });
    it('Empty', () => {
      const msg = validateJson('Timebar', emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateJson('Timebar', dataTbMis);
      msg.length.should.equal(8);
      checkErrorObject(msg);
    });
  });
  describe('PlotView', () => {
    it('Valid', () => {
      should.not.exist(validateJson('PlotView', dataPv));
    });
    it('Empty', () => {
      const msg = validateJson('PlotView', emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateJson('PlotView', dataPvMis);
      msg.length.should.equal(3);
      checkErrorObject(msg);
    });
  });
  describe('TextView', () => {
    it('Valid', () => {
      should.not.exist(validateJson('TextView', dataTv));
    });
    it('Empty', () => {
      const msg = validateJson('TextView', emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateJson('TextView', dataTvMis);
      msg.length.should.equal(6);
      checkErrorObject(msg);
    });
  });
  describe('MimicView', () => {
    it('Valid', () => {
      should.not.exist(validateJson('MimicView', dataMv));
    });
    it('Empty', () => {
      const msg = validateJson('MimicView', emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateJson('MimicView', dataMvMis);
      msg.length.should.equal(2);
      checkErrorObject(msg);
    });
  });
  describe('Page', () => {
    it('Valid', () => {
      should.not.exist(validateJson('Page', dataPg));
    });
    it('Empty', () => {
      const msg = validateJson('Page', emptyData);
      msg.should.equal('Empty file');
    });
    it('Invalid', () => {
      const msg = validateJson('Page', dataPgMis);
      msg.length.should.equal(3);
      checkErrorObject(msg);
    });
  });
});
