import '../../../lib/common/test';
import { isMultiDomainAndSessionSupported, getSchemaJson } from './index';

describe('TextView/main', () => {
  it('isMultiDomainAndSessionSupported', () => {
    isMultiDomainAndSessionSupported().should.equal(false);
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
