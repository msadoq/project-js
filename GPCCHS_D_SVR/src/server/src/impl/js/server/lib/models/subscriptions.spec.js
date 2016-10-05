const { should } = require('../utils/test');
const model = require('./subscriptions');
const { getDataId, getFilter, getRemoteId } = require('../stubs/data');
const flattenDataId = require('../models/getLocalId');

describe('models/subscriptions', () => {
  beforeEach(() => {
    model.cleanup();
  });




  describe('exists', () => {
    it('yes', () => {
      const myDataId = getDataId();
      model.addRecord(myDataId);
      model.exists(myDataId)
        .should.be.an('boolean')
        .that.equal(true);
    });
    it('no', () => {
      const myDataId = getDataId();
      model.exists(myDataId)
        .should.be.an('boolean')
        .that.equal(false);
    });
  });

  describe('getAll', () => {
    it('none', () => {
      const subscriptions = model.getAll();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      model.addRecord(myDataId);
      const subscriptions = model.getAll();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(1);
      subscriptions[0].should.be.an('object')
        .that.has.properties({
          flatDataId: flattenDataId(myDataId),
          dataId: myDataId,
          filters: {},
        });
    });
    it('multi', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myDataId2 = getDataId({ parameterName: 'dataId2' });
      model.addRecord(myDataId);
      model.addRecord(myDataId2);
      const subscriptions = model.getAll();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(2);
      subscriptions[0].should.be.an('object')
        .that.has.properties({
          flatDataId: flattenDataId(myDataId),
          dataId: myDataId,
          filters: {},
        });
      subscriptions[1].should.be.an('object')
        .that.has.properties({
          flatDataId: flattenDataId(myDataId2),
          dataId: myDataId2,
          filters: {},
        });
    });
  });

  describe('addFilter', () => {
    it('no subscription', () => {
      const myDataId = getDataId();
      const myFilter = getFilter();
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      const subscription = model.addFilters(myDataId, filters);
      model.count().should.equal(0);
      const subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
      should.not.exist(subscription);
    });
    it('one', () => {
      const myDataId = getDataId();
      const myFilter = getFilter();
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      model.addRecord(myDataId);
      const subscription = model.addFilters(myDataId, filters);
      model.count().should.equal(1);
      const subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(1);
      subscriptions[0].should.be.an('object');
      subscriptions[0].should.have.properties({
        flatDataId: flattenDataId(myDataId),
        dataId: myDataId,
        filters,
      });
      subscription.should.deep.equal(subscriptions[0]);
    });
    it('one with multiple ids', () => {
      const myDataId = getDataId();
      const myFilter = getFilter({ operand: 42 });
      const myFilter2 = getFilter({ operand: 91 });
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const myRemoteId2 = getRemoteId({ filters: [myFilter2] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      filters[myRemoteId2] = myFilter2;
      model.addRecord(myDataId);
      const subscription = model.addFilters(myDataId, filters);
      model.count().should.equal(1);
      const subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(1);
      subscriptions[0].should.be.an('object');
      subscriptions[0].should.have.properties({
        flatDataId: flattenDataId(myDataId),
        dataId: myDataId,
        filters,
      });
      subscription.should.be.an('object');
      subscription.should.deep.equal(subscriptions[0]);
    });
    it('multi', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myDataId2 = getDataId({ parameterName: 'dataId2' });
      const myFilter = getFilter({ operand: 42 });
      const myFilter2 = getFilter({ operand: 91 });
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const myRemoteId2 = getRemoteId({ filters: [myFilter2] });
      const filters1 = {};
      filters1[myRemoteId] = myFilter;
      const filters2 = {};
      filters2[myRemoteId2] = myFilter2;
      model.addRecord(myDataId);
      model.addRecord(myDataId2);
      const subscription1 = model.addFilters(myDataId, filters1);
      const subscription2 = model.addFilters(myDataId2, filters2);
      model.count().should.equal(2);
      const subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(2);
      subscriptions[0].should.be.an('object');
      subscriptions[0].should.have.properties({
        flatDataId: flattenDataId(myDataId),
        dataId: myDataId,
        filters: filters1,
      });
      subscription1.should.be.an('object');
      subscription1.should.deep.equal(subscriptions[0]);

      subscriptions[1].should.be.an('object');
      subscriptions[1].should.have.properties({
        flatDataId: flattenDataId(myDataId2),
        dataId: myDataId2,
        filters: filters2,
      });
      subscription2.should.be.an('object');
      subscription2.should.deep.equal(subscriptions[1]);
    });
  });

  describe('getRemoteIds', () => {
    it('one', () => {
      const myDataId = getDataId();
      const myFilter = getFilter();
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      model.addRecord(myDataId);
      model.addFilters(myDataId, filters);
      const remoteIds = model.getRemoteIds(myDataId);
      remoteIds.should.be.an('array')
        .that.has.lengthOf(1);
      remoteIds[0].should.equal(myRemoteId);
    });
    it('multi', () => {
      const myDataId = getDataId();
      const myFilter = getFilter({ value: 42 });
      const myFilter2 = getFilter({ value: 91 });
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const myRemoteId2 = getRemoteId({ filters: [myFilter2] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      filters[myRemoteId2] = myFilter2;
      model.addRecord(myDataId);
      model.addFilters(myDataId, filters);
      const remoteIds = model.getRemoteIds(myDataId);
      remoteIds.should.be.an('array')
        .that.has.lengthOf(2);
      remoteIds[0].should.equal(myRemoteId);
      remoteIds[1].should.equal(myRemoteId2);
    });
  });

  describe('getFilters', () => {
    it('one', () => {
      const myDataId = getDataId();
      const myFilter = getFilter();
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      model.addRecord(myDataId);
      model.addFilters(myDataId, filters);
      const returnedFilters = model.getFilters(myDataId);
      returnedFilters.should.deep.equal(filters);
    });
    it('multi', () => {
      const myDataId = getDataId();
      const myFilter = getFilter({ operand: 42 });
      const myFilter2 = getFilter({ operand: 91 });
      const myRemoteId = getRemoteId({ filters: [myFilter] });
      const myRemoteId2 = getRemoteId({ filters: [myFilter2] });
      const filters = {};
      filters[myRemoteId] = myFilter;
      filters[myRemoteId2] = myFilter2;
      model.addRecord(myDataId);
      model.addFilters(myDataId, filters);
      const returnedFilters = model.getFilters(myDataId);
      returnedFilters.should.deep.equal(filters);
    });
  });

  describe('removeByDataId', () => {
    it('not existing', () => {
      const myDataId = getDataId();
      model.removeByDataId(myDataId);
      const subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId();
      model.addRecord(myDataId);
      let subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(1);
      model.removeByDataId(myDataId);
      subscriptions = model.find();
      subscriptions.should.be.an('array')
        .that.have.lengthOf(0);
    });
  });
});
