import '../../../lib/common/test';
import { dataLayout, getSchemaJson } from './index';

describe('TextView/main', () => {
  it('dataLayout', () => {
    dataLayout().should.equal('one');
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
