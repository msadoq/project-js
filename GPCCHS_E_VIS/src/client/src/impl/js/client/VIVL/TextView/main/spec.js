import '../../../lib/common/test';
import { dataLayout, getSchemaJson } from './index';

describe('TextView/main', () => {
  it('dataLayout', () => {
    dataLayout().should.equal('last');
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
