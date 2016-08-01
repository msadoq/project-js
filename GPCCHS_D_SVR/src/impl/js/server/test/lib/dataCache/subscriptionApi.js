const debug = require('../../../lib/io/debug')('test:dataCache:subscriptionApi');
const { chai, should } = require('../../utils');

const { searchIntervals } = require('../../../lib/subscriptionManager/lib/intervalApi');
const { subscriptions } = require('../../../lib/io/loki');

const subHeader = { dataFullName: 'a', sessionId: 0, domainId: 0 };
const subInterval = { visuWindow: { dInf: 0, dSup: 10 } };
const sub = Object.assign({}, subHeader, subInterval);

describe('subscriptionApi', () => {
  describe('searchLimits', () => {
    beforeEach(() => {
      subscriptions.clear();
    });
    it('noSub', () => {
      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub.visuWindow.dInf);
      limits[0].visuWindow.should.have.property('dSup', sub.visuWindow.dSup);
    });
    it('leftSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: -5, dSup: 5 } });
      subscriptions.insert(sub1);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub1.visuWindow.dSup);
      limits[0].visuWindow.should.have.property('dSup', sub.visuWindow.dSup);
    });
    it('rightSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: 5, dSup: 15 } });
      subscriptions.insert(sub1);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub.visuWindow.dInf);
      limits[0].visuWindow.should.have.property('dSup', sub1.visuWindow.dInf);
    });
    it('leftAndRightSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: -5, dSup: 2.5 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { dInf: 7.5, dSup: 15 } });
      subscriptions.insert(sub1);
      subscriptions.insert(sub2);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub1.visuWindow.dSup);
      limits[0].visuWindow.should.have.property('dSup', sub2.visuWindow.dInf);
    });
    it('middleSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: 2.5, dSup: 7.5 } });
      subscriptions.insert(sub1);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(2);

      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub.visuWindow.dInf);
      limits[0].visuWindow.should.have.property('dSup', sub1.visuWindow.dInf);

      limits[1].should.be.an('object').with.property('visuWindow');
      limits[1].visuWindow.should.be.an('object');
      limits[1].visuWindow.should.have.property('dInf', sub1.visuWindow.dSup);
      limits[1].visuWindow.should.have.property('dSup', sub.visuWindow.dSup);
    });
    it('threeSubs', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: -5, dSup: 2 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { dInf: 4, dSup: 6 } });
      const sub3 = Object.assign({}, subHeader, { visuWindow: { dInf: 8, dSup: 15 } });
      subscriptions.insert(sub1);
      subscriptions.insert(sub2);
      subscriptions.insert(sub3);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(2);

      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub1.visuWindow.dSup);
      limits[0].visuWindow.should.have.property('dSup', sub2.visuWindow.dInf);

      limits[1].should.be.an('object').with.property('visuWindow');
      limits[1].visuWindow.should.be.an('object');
      limits[1].visuWindow.should.have.property('dInf', sub2.visuWindow.dSup);
      limits[1].visuWindow.should.have.property('dSup', sub3.visuWindow.dInf);
    });
    it('outsideLeftAndRightSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: -5, dSup: -2.5 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { dInf: 12.5, dSup: 15 } });
      subscriptions.insert(sub1);
      subscriptions.insert(sub2);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('visuWindow');
      limits[0].visuWindow.should.be.an('object');
      limits[0].visuWindow.should.have.property('dInf', sub.visuWindow.dInf);
      limits[0].visuWindow.should.have.property('dSup', sub.visuWindow.dSup);
    });
    it('fullSub', () => {
      const sub1 = Object.assign({}, subHeader, { visuWindow: { dInf: 0, dSup: 5 } });
      const sub2 = Object.assign({}, subHeader, { visuWindow: { dInf: 5, dSup: 10 } });
      subscriptions.insert(sub1);
      subscriptions.insert(sub2);

      const limits = searchIntervals(subscriptions, sub);
      debug.info(limits);
      limits.should.be.an('array').that.has.lengthOf(0);
    });
  });
});

/* describe('async', () => {
  it('fake', done => {
    setTimeout(() => {
      done();
    }, 1500);
  });
}); */
