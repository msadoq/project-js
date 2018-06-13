import {
  domainDeterminationForColor,
  domainDeterminationForDisplay,
} from './domains';


describe('windowProcess', () => {
  describe('windowProcess :: common :: domains', () => {
    describe('domainDeterminationForColor simples cases', () => {
      test('given only wildcard for all domains, when process domainDeterminationForColor for workspace, page or view then return "unresolved"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['*'];
        const viewsDomains = ['*'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('unresolved');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('unresolved');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('unresolved');
      });
      test('given only wildcard for all domains except for workspace (domain1), when process domainDeterminationForColor for workspace, page or view then return "domain1"', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = ['*'];
        const viewsDomains = ['*'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('domain1');
      });
      test('given only wildcard for all domains except for one page (domain1), when process domainDeterminationForColor for workspace, page or view then return "domain1"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['domain1'];
        const viewsDomains = ['*'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('domain1');
      });
      test('given only wildcard for all domains except for one view (domain1), when process domainDeterminationForColor for workspace, page or view then return "domain1"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['*'];
        const viewsDomains = ['domain1'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('domain1');
      });
      test('given only wildcard for all domains except for one ep (domain1), when process domainDeterminationForColor for workspace, page or view then return "domain1"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['*'];
        const viewsDomains = ['*'];
        const epDomains = ['domain1'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('domain1');
      });
    });
    describe('domainDeterminationForColor more complex cases', () => {
      test('given domain1 for workspace and domain2 for one page, when process domainDeterminationForColor for workspace, page or view then return "domain1"', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = ['domain2'];
        const viewsDomains = ['*'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('domain1');
      });
      test('given domain1 for workspace and domain2 for one view, when process domainDeterminationForColor for workspace, page or view then return "domain1"', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = ['*'];
        const viewsDomains = ['domain2'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('domain1');
      });
      test('given domain1 for workspace and domain1 and domain2 for views, when process domainDeterminationForColor for workspace or page then return "domain1"', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = ['*'];
        const viewsDomains = ['domain1', 'domain2'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('domain1');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('domain1');
      });
      test('given domain1 and domain2 for pages, when process domainDeterminationForColor for workspace then return "unresolved"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['domain1', 'domain2'];
        const viewsDomains = ['*'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('unresolved');
      });
      test('given domain1 and domain2 for views, when process domainDeterminationForColor for workspace or page then return "unresolved"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['*'];
        const viewsDomains = ['domain1', 'domain2'];
        const epDomains = ['*'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('unresolved');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('unresolved');
      });
      test('given domain1 and domain2 for eps, when process domainDeterminationForColor for workspace or page then return "unresolved"', () => {
        const workspaceDomain = '*';
        const pageDomain = ['*'];
        const viewsDomains = ['*'];
        const epDomains = ['domain1', 'domain2'];
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'workspace'
        ))
          .toEqual('unresolved');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'page'
        ))
          .toEqual('unresolved');
        expect(domainDeterminationForColor(
          workspaceDomain,
          pageDomain,
          viewsDomains,
          epDomains,
          'view'
        ))
          .toEqual('unresolved');
      });
    });
    describe('domainDeterminationForDisplay', () => {
      test('given only wildcard for all domains, when process domainDeterminationForDisplay, return true', () => {
        const workspaceDomain = '*';
        const pageDomain = '*';
        const viewDomain = '*';
        const epDomain = '*';
        expect(domainDeterminationForDisplay(
          workspaceDomain,
          pageDomain,
          viewDomain,
          epDomain
        ))
          .toBeTruthy();
      });
      test('given only wildcard for all domains except for one, when process domainDeterminationForDisplay, return true', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = '*';
        const viewDomain = '*';
        const epDomain = '*';
        expect(domainDeterminationForDisplay(
          workspaceDomain,
          pageDomain,
          viewDomain,
          epDomain
        ))
          .toBeTruthy();
      });
      test('given only wildcard for all domains except for one, when process domainDeterminationForDisplay, return true', () => {
        const workspaceDomain = '*';
        const pageDomain = '*';
        const viewDomain = '*';
        const epDomain = 'domain1';
        expect(domainDeterminationForDisplay(
          workspaceDomain,
          pageDomain,
          viewDomain,
          epDomain
        ))
          .toBeTruthy();
      });
      test('given a domain to workspace and a different domain for the entrypoint, when process domainDeterminationForDisplay, return false', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = '*';
        const viewDomain = '*';
        const epDomain = 'domain2';
        expect(domainDeterminationForDisplay(
          workspaceDomain,
          pageDomain,
          viewDomain,
          epDomain
        ))
          .toBeFalsy();
      });
      test('given two different domains for workspace and page, when process domainDeterminationForDisplay, return false', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = 'domain2';
        const viewDomain = '*';
        const epDomain = '*';
        expect(domainDeterminationForDisplay(
          workspaceDomain,
          pageDomain,
          viewDomain,
          epDomain
        ))
          .toBeFalsy();
      });
      test('given two different domains for workspace and page, when process domainDeterminationForDisplay, return false', () => {
        const workspaceDomain = 'domain1';
        const pageDomain = 'domain2';
        const viewDomain = '*';
        const epDomain = 'domain1';
        expect(domainDeterminationForDisplay(
          workspaceDomain,
          pageDomain,
          viewDomain,
          epDomain
        ))
          .toBeFalsy();
      });
    });
  });
});
