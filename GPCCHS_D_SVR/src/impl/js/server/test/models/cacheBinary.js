require('../../lib/utils/test');
const model = require('../../lib/models/cacheBinary');

describe('models/cacheBinary', () => {
  beforeEach(() => {
    model.clear();
  });

  describe('addRecord', () => {
    it('one', () => {
      model.addRecord({ metaField: 'foo' }, { dataField: 'text' });
      const records = model.find();
      records.should.be.an('array').that.has.lengthOf(1);
      records[0].should.be.an('object').with.properties({
        metaField: 'foo',
        binPayload: {
          dataField: 'text',
        },
      });
    });
    it('multi', () => {
      model.addRecord({ metaField: 'foo' }, { dataField: 'text1' });
      model.addRecord({ metaField: 'foo' }, { dataField: 'text2' });
      model.count().should.equal(2);
    });
  });
});
