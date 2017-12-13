// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/domains . . .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/domains';
import domainsReducer, { getDomains } from '.';

const reducer = freezeArgs(domainsReducer);

describe('store:domains:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  test('unknown action', () => {
    expect(reducer([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }], {})).toEqual([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]);
  });
  test('set state', () => {
    expect(reducer(undefined, actions.updateDomains([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]))).toEqual([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]);
  });
});

describe('store:domains:selectors', () => {
  describe('getDomains', () => {
    test('should return the whole list', () => {
      const state = {
        domains: {
          myDomainId: { domainId: 1 },
          myOtherId: { domainId: 2 },
        },
      };
      expect(getDomains(state)).toBe(state.domains);
    });
  });
});
