const { should } = require('../utils/test');
const model = require('./subscriptions');
const { getDataId, getRemoteId } = require('common/stubs/data');
const flattenDataId = require('common/utils/flattenDataId');

describe('models/subscriptions', () => {
  beforeEach(() => {
    model.cleanup();
  });

  describe('exists', () => {
    it('should returns true if subscription exists', () => {
      const myDataId = getDataId();
      model.addRecord(myDataId);
      model.exists(myDataId).should.equal(true);
    });
    it('should returns false if subscription doesn\'t exist', () => {
      const myDataId = getDataId();
      model.exists(myDataId).should.equal(false);
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
        });
      subscriptions[1].should.be.an('object')
        .that.has.properties({
          flatDataId: flattenDataId(myDataId2),
          dataId: myDataId2,
        });
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
