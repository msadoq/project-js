const debug = require('../lib/io/debug')('test:subscriptionManager:intervalApi');
require('../lib/utils/test');

const searchIntervals = require('./intervals');
const model = require('subscriptionsModel');

const subHeader = { dataFullName: 'a', sessionId: 0, domainId: 0 };
const subInterval = { visuWindow: { lower: 0, upper: 10 } };
const sub = Object.assign({}, subHeader, subInterval);

describe('intervalApi', () => {
  describe('searchIntervals', () => {
    beforeEach(() => {
      model.clear();
    });
    it('noSub', () => {
      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(1);
        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub.visuWindow.lower);
        limits[0].visuWindow.should.have.property('upper', sub.visuWindow.upper);
      });
    });
    it('leftSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: -5, upper: 5 } });
      model.insert(sub1);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(1);
        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub1.visuWindow.upper);
        limits[0].visuWindow.should.have.property('upper', sub.visuWindow.upper);
      });
    });
    it('rightSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: 5, upper: 15 } });
      model.insert(sub1);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(1);
        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub.visuWindow.lower);
        limits[0].visuWindow.should.have.property('upper', sub1.visuWindow.lower);
      });
    });
    it('leftAndRightSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: -5, upper: 2.5 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { lower: 7.5, upper: 15 } });
      model.insert(sub1);
      model.insert(sub2);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(1);
        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub1.visuWindow.upper);
        limits[0].visuWindow.should.have.property('upper', sub2.visuWindow.lower);
      });
    });
    it('middleSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: 2.5, upper: 7.5 } });
      model.insert(sub1);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(2);

        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub.visuWindow.lower);
        limits[0].visuWindow.should.have.property('upper', sub1.visuWindow.lower);

        limits[1].should.be.an('object').with.property('visuWindow');
        limits[1].visuWindow.should.be.an('object');
        limits[1].visuWindow.should.have.property('lower', sub1.visuWindow.upper);
        limits[1].visuWindow.should.have.property('upper', sub.visuWindow.upper);
      });
    });
    it('threeSubs', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: -5, upper: 2 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { lower: 4, upper: 6 } });
      const sub3 = Object.assign({}, subHeader, { visuWindow: { lower: 8, upper: 15 } });
      model.insert(sub1);
      model.insert(sub2);
      model.insert(sub3);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(2);

        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub1.visuWindow.upper);
        limits[0].visuWindow.should.have.property('upper', sub2.visuWindow.lower);

        limits[1].should.be.an('object').with.property('visuWindow');
        limits[1].visuWindow.should.be.an('object');
        limits[1].visuWindow.should.have.property('lower', sub2.visuWindow.upper);
        limits[1].visuWindow.should.have.property('upper', sub3.visuWindow.lower);
      });
    });
    it('outsideLeftAndRightSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: -5, upper: -2.5 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { lower: 12.5, upper: 15 } });
      model.insert(sub1);
      model.insert(sub2);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(1);
        limits[0].should.be.an('object').with.property('visuWindow');
        limits[0].visuWindow.should.be.an('object');
        limits[0].visuWindow.should.have.property('lower', sub.visuWindow.lower);
        limits[0].visuWindow.should.have.property('upper', sub.visuWindow.upper);
      });
    });
    it('fullSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { lower: 0, upper: 5 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { lower: 5, upper: 10 } });
      model.insert(sub1);
      model.insert(sub2);

      searchIntervals(model, sub, (err, limits) => {
        debug.info(limits);
        limits.should.be.an('array').that.has.lengthOf(0);
      });
    });
  });
});
