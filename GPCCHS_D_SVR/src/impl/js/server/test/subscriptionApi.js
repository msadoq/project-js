const subApi = require('../lib/subscriptionManager');
const chai = require('chai');
const should = chai.should();
const { subscriptions } = require('../lib/io/loki');

const subHeader = { 'DataFullName': 'a', 'SessionId': 0, 'DomainId': 0 };
const subInterval = { 'VisuWindow': { 'dInf': 0, 'dSup': 10 } };
const sub = Object.assign({}, subHeader, subInterval);

describe('subscriptionApi', () => {
  describe('searchLimits', () => {
  
    beforeEach(() => {
      subscriptions.clear();
    });
    it('noSub', () => {
      const limits = subApi.searchLimits(sub);
      console.log(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('VisuWindow');
      limits[0].VisuWindow.should.be.an('object');
      limits[0].VisuWindow.should.have.property('dInf', sub.VisuWindow.dInf);
      limits[0].VisuWindow.should.have.property('dSup', sub.VisuWindow.dSup);
    });
    it('leftSub', () => {
      const sub1 = Object.assign({}, subHeader, { 'VisuWindow': { 'dInf': -5, 'dSup': 5 } });    
      subscriptions.insert(sub1);

      const limits = subApi.searchLimits(sub);
      console.log(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('VisuWindow');
      limits[0].VisuWindow.should.be.an('object');
      limits[0].VisuWindow.should.have.property('dInf', sub1.VisuWindow.dSup);
      limits[0].VisuWindow.should.have.property('dSup', sub.VisuWindow.dSup);
    });
    it('rightSub', () => {
      const sub1 = Object.assign({}, subHeader, { 'VisuWindow': { 'dInf': 5, 'dSup': 15 } });    
      subscriptions.insert(sub1);

      const limits = subApi.searchLimits(sub);
      console.log(limits);
      limits.should.be.an('array').that.has.lengthOf(1);
      limits[0].should.be.an('object').with.property('VisuWindow');
      limits[0].VisuWindow.should.be.an('object');
      limits[0].VisuWindow.should.have.property('dInf', sub.VisuWindow.dInf);
      limits[0].VisuWindow.should.have.property('dSup', sub1.VisuWindow.dInf);
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