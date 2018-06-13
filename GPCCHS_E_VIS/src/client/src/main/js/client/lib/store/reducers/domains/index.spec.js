// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for
//  each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/domains . . .
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js
//  in jest/index.js
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { freezeArgs } from 'common/jest';
import * as actions from 'store/actions/domains';
import domainsReducer, { getDomains, getDomainByName, getDomainByNameWithFallback } from '.';

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
  describe('getDomainByName', () => {
    test('should return the matched domain', () => {
      const state = {
        domains: {
          myDomainId: { domainId: 1, name: 'domainName-1' },
          myOtherId: { domainId: 2, name: 'domainName-2' },
        },
      };
      expect(getDomainByName(state, { domainName: 'domainName-1' })).toEqual({ domainId: 1, name: 'domainName-1' });
    });
    test('should return the matched domain', () => {
      const state = {
        domains: {
          myDomainId: { domainId: 1, name: 'domainName-1' },
          myOtherId: { domainId: 2, name: 'domainName-2' },
        },
      };
      expect(getDomainByName(state, { domainName: 'domainName-3' })).toEqual(undefined);
    });
  });
  describe('getDomainByNameWithFallback', () => {
    const state = {
      domains: {
        domainId1: { domainId: 1, name: 'domainName-1' },
        domainId2: { domainId: 2, name: 'domainName-2' },
        domainId3: { domainId: 3, name: 'viewDomainName' },
        domainId4: { domainId: 4, name: 'pageDomainName' },
        domainId5: { domainId: 5, name: 'workspaceDomainName' },
      },
      views: {
        'view-id': {
          domainName: 'viewDomainName',
        },
      },
      pages: {
        'page-id': {
          uuid: 'page-id',
          domainName: 'pageDomainName',
        },
      },
      hsc: {
        domainName: 'workspaceDomainName',
      },
    };
    test('undefined domain name', () => {
      expect(getDomainByNameWithFallback(state, {
        domainName: 'undefined', viewId: 'view-id', pageId: 'page-id',
      })).toEqual(undefined);
    });
    test('no fallback', () => {
      expect(getDomainByNameWithFallback(state, {
        domainName: 'domainName-1', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ domainId: 1, name: 'domainName-1' });
    });
    test('fallback on view domain name', () => {
      expect(getDomainByNameWithFallback(state, {
        domainName: '*', viewId: 'view-id', pageId: 'page-id',
      })).toEqual({ domainId: 3, name: 'viewDomainName' });
    });
    test('fallback on page domain name', () => {
      expect(getDomainByNameWithFallback(state, {
        domainName: '*', viewId: '*', pageId: 'page-id',
      })).toEqual({ domainId: 4, name: 'pageDomainName' });
    });
    test('fallback on workspace domain name', () => {
      expect(getDomainByNameWithFallback(state, {
        domainName: '*', viewId: '*', pageId: '*',
      })).toEqual({ domainId: 5, name: 'workspaceDomainName' });
    });
    test('invalid configuration', () => {
      expect(getDomainByNameWithFallback({
        ...state,
        hsc: {},
      }, {
        domainName: '*', viewId: '*', pageId: '*',
      })).toEqual({ error: 'invalid entry point, domain not defined on entities' });
    });
  });
});
