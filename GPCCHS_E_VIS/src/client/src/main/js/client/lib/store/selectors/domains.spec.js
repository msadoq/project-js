import '../../common/test';
import { getDomains } from './domains';

describe('store:domains:selectors', () => {
  describe('getDomains', () => {
    it('should return the whole list', () => {
      const state = {
        domains: {
          myDomainId: { domainId: 1 },
          myOtherId: { domainId: 2 },
        },
      };
      getDomains(state).should.equal(state.domains);
    });
  });
});
