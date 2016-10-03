require('../utils/test');
const model = require('./views');

describe('models/views', () => {
  beforeEach(() => {
    model.cleanup();
  });

  const viewInstance = {};

  it('addRecord', () => {
    const record = model.addRecord('my-id', viewInstance);
    record.should.be.an('object').with.property('$loki');
    const records = model.find();
    records.should.be.an('array').that.has.lengthOf(1);
    records[0].should.be.an('object');
    records[0].viewId.should.equal('my-id');
    records[0].instance.should.equal(viewInstance);
  });
  it('delRecord', () => {
    model.addRecord('foo', viewInstance);
    model.addRecord('bar', viewInstance);
    model.addRecord('baz', viewInstance);
    model.find().should.be.an('array').that.has.lengthOf(3);
    model.delRecord('bar', viewInstance);
    model.find().should.be.an('array').that.has.lengthOf(2);
  });
  it('findBySparkId', () => {
    model.addRecord('foo', viewInstance);
    model.addRecord('bar', viewInstance);
    model.addRecord('baz', viewInstance);
    model.findByViewId('bar').viewId.should.equal('bar');
  });
});
