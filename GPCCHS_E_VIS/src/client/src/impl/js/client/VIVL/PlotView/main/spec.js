import '../../../lib/common/test';
import { isMultiDomainAndSessionSupported, getSchemaJson } from './index';

describe('PlotView/main', () => {
  it('isMultiDomainAndSessionSupported', () => {
    isMultiDomainAndSessionSupported().should.equal(true);
  });
  it('getSchemaJson', () => {
    getSchemaJson().should.be.an('object');
  });
});
