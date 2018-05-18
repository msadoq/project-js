import _each from 'lodash/each';
import {
  isCustomizable,
  getStateColorFilters,
  getStateColor,
  getBackgroundColorByDomains,
  getBorderColorForNav,
  getBorderColorForTab,
  getColorWithDomainDetermination,
  STATE_COLOR_NOMINAL,
  STATE_COLOR_WARNING,
  STATE_COLOR_ALARM,
  STATE_COLOR_SEVERE,
  STATE_COLOR_CRITICAL,
  STATE_COLOR_OUT_OF_RANGE,
} from 'windowProcess/common/colors';

describe('windowProcess', () => {
  describe('windowProcess :: common', () => {
    describe('windowProcess :: common :: colors', () => {
      describe('isCustomizable', () => {
        _each([
          STATE_COLOR_WARNING,
          STATE_COLOR_ALARM,
          STATE_COLOR_SEVERE,
          STATE_COLOR_CRITICAL,
          STATE_COLOR_OUT_OF_RANGE,
        ], (monitoringState) => {
          _each([true, false], (obsolete) => {
            _each([true, false], (significant) => {
              test(`isCustomizable :: ${monitoringState}|${obsolete}|${significant}`, () => {
                expect(isCustomizable(monitoringState, obsolete, significant)).toBe(false);
              });
            });
          });
        });
        test('isCustomizable :: alarm', () => {
          expect(isCustomizable(STATE_COLOR_NOMINAL, true, true)).toBe(false);
          expect(isCustomizable(STATE_COLOR_NOMINAL, true, false)).toBe(false);
          expect(isCustomizable(STATE_COLOR_NOMINAL, false, true)).toBe(true);
          expect(isCustomizable(STATE_COLOR_NOMINAL, false, false)).toBe(false);
        });
      });
      describe('getStateColorFilters', () => {
        test('getStateColorFilters :: memoize', () => {
          const firstRun = getStateColorFilters(false, false);
          const secondRun = getStateColorFilters(false, false);
          expect(secondRun).toBe(firstRun);
        });
        test('getStateColorFilters :: true / true', () => {
          expect(getStateColorFilters(true, true)).toEqual([
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
        test('getStateColorFilters :: true / false', () => {
          expect(getStateColorFilters(true, false)).toEqual([
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
        test('getStateColorFilters :: false / true', () => {
          expect(getStateColorFilters(false, true)).toEqual([
            { customize: true, color: '#2ecc71', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#f1c40f', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#e67e22', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#d35400', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#e74c3c', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#c0392b', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
        test('getStateColorFilters :: false / false', () => {
          expect(getStateColorFilters(false, false)).toEqual([
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
      });
      describe('getStateColor', () => {
        test('getStateColor :: memoize', () => {
          const firstRun = getStateColor(false, false, STATE_COLOR_NOMINAL);
          const secondRun = getStateColor(false, false, STATE_COLOR_NOMINAL);
          expect(secondRun).toBe(firstRun);
        });
        test('getStateColor :: true / true', () => {
          expect(getStateColor(true, true, STATE_COLOR_NOMINAL)).toEqual({
            customize: false,
            color: '#3498db',
            condition: {
              field: 'monitoringState',
              operand: STATE_COLOR_NOMINAL,
              operator: '=',
            },
          });
        });
      });
      describe('getBackgroundColorByDomains', () => {
        test('returns a color when only one defined domain', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewDomain = '*';
          const epDomains = ['fr.cnes.isis'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .not.toEqual(null);
        });
        test('returns null when only wildcard char for domains', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewDomain = '*';
          const epDomains = ['*'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .toEqual(null);
        });
        test('returns null when more than one domain for ep', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewDomain = '*';
          const epDomains = ['fr.cnes.isis', 'fr.cnes.isis.simupus'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .toEqual(null);
        });
        test('returns a color when two domains for ep and one is wildcard', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewDomain = '*';
          const epDomains = ['fr.cnes.isis', '*'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .not.toEqual(null);
        });
        test('returns a color when page domain is set and ep domain is wildcard', () => {
          const workspaceDomain = '*';
          const pageDomain = 'fr.cnes.isis';
          const viewDomain = '*';
          const epDomains = ['*'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .not.toEqual(null);
        });
        test('returns a color when workspace domain is set and view domain is wildcard', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = '*';
          const viewDomain = '*';
          const epDomains = ['*'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .not.toEqual(null);
        });
        test('returns null when workspace domain is set and ep domain is not wildcard', () => {
          const viewDomain = 'fr.cnes.isis';
          const workspaceDomain = '*';
          const pageDomain = '*';
          const epDomains = ['fr.cnes.isis.simupus'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .toEqual(null);
        });
        test('returns null when workspace domain is set and view domain is not wildcard', () => {
          const viewDomain = 'fr.cnes.isis';
          const workspaceDomain = '*';
          const pageDomain = '*';
          const epDomains = ['fr.cnes.isis.simupus'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .toEqual(null);
        });
        test('returns null when ep domains are differents than view domain', () => {
          const viewDomain = '*';
          const workspaceDomain = '*';
          const pageDomain = 'fr.cnes.isis';
          const epDomains = ['fr.cnes.isis.simupus'];
          expect(getBackgroundColorByDomains(workspaceDomain, pageDomain, viewDomain, epDomains))
            .toEqual(null);
        });
      });
      describe('getBorderColorForTab', () => {
        test('returns no color when only wildcard', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewsDomains = ['*'];
          const epDomains = ['*'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .toEqual('#CCC');
        });
        test('returns a color when wildcard for page and views and eps and domain set for workspace', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = '*';
          const viewsDomains = ['*'];
          const epDomains = ['*'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color when wildcard workspace views eps and domain set for page', () => {
          const workspaceDomain = '*';
          const pageDomain = 'fr.cnes.isis';
          const viewsDomains = ['*'];
          const epDomains = ['*'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color when page, eps and workspace have the same domain ', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = 'fr.cnes.isis';
          const viewsDomains = ['*'];
          const epDomains = ['fr.cnes.isis'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color when eps and workspace have the same domain and page domain is wildcard', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = '*';
          const viewsDomains = ['*'];
          const epDomains = ['fr.cnes.isis'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color when eps and workspace have the different domain and page domain is wildcard', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = '*';
          const viewsDomains = ['*'];
          const epDomains = ['fr.cnes.isis'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .not.toEqual('#CCC');
        });
        test('returns no color when eps have more than one domain and page and workspace domain is wildcard', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewsDomains = ['*'];
          const epDomains = ['fr.cnes.isis', 'fr.cnes.isis.simupus'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .toEqual('#CCC');
        });
        test('returns no color page and workspace domain is different', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = 'fr.cnes.isis.simupus';
          const viewsDomains = ['*'];
          const epDomains = ['*'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .toEqual('#CCC');
        });
        test('returns color when views ans workspace are different', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const pageDomain = '*';
          const viewsDomains = ['fr.cnes.isis.simupus'];
          const epDomains = ['*'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .not.toEqual('#CCC');
        });
        test('returns no color when only wildcard and more than one domain for views', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewsDomains = ['fr.cnes.isis', 'fr.cnes.isis.simupus'];
          const epDomains = ['*'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .toEqual('#CCC');
        });
        test('returns no color when only wildcard and view domain is different than ep domains', () => {
          const workspaceDomain = '*';
          const pageDomain = '*';
          const viewsDomains = ['fr.cnes.isis'];
          const epDomains = ['fr.cnes.isis.simupus'];
          expect(getBorderColorForTab(workspaceDomain, pageDomain, viewsDomains, epDomains))
            .toEqual('#CCC');
        });
      });
      describe('getBorderColorForNav', () => {
        test('returns null if only wildcard for domains', () => {
          const workspaceDomain = '*';
          const viewsDomains = {
            page1: ['*'],
            page2: ['*'],
          };
          const pages = {
            page1: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .toEqual('#CCC');
        });
        test('returns a color if only wildcard for views and workspace and one domain for pages except wildcard', () => {
          const workspaceDomain = '*';
          const viewsDomains = {
            page1: ['*'],
            page2: ['*'],
          };
          const pages = {
            page1: {
              domainName: 'fr.cnes.isis',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color if only wildcard for eps, views and page and domain set for workspace', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const viewsDomains = {
            page1: ['*'],
            page2: ['*'],
          };
          const pages = {
            page1: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color if domain set for workspace', () => {
          const workspaceDomain = 'fr.cnes.isis';
          const viewsDomains = {
            page1: ['*'],
            page2: ['*'],
          };
          const pages = {
            page1: {
              domainName: 'fr.cnes.isis.simupus',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: '*',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .not.toEqual('#CCC');
        });
        test('returns a color if wildcard for workspace and pages, views and only one domain for eps except wildcard', () => {
          const workspaceDomain = '*';
          const viewsDomains = {
            page1: ['*'],
            page2: ['*'],
          };
          const pages = {
            page1: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: 'fr.cnes.isis',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: 'fr.cnes.isis',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .not.toEqual('#CCC');
        });
        test('returns no color if wildcard for workspace and pages and more than one domain for eps except wildcard', () => {
          const workspaceDomain = '*';
          const viewsDomains = {
            page1: ['*'],
            page2: ['*'],
          };
          const pages = {
            page1: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: 'fr.cnes.isis.simupus',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: 'fr.cnes.isis',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .toEqual('#CCC');
        });
        test('returns no color if wildcard for workspace and pages and ep domains differents than view domain', () => {
          const workspaceDomain = '*';
          const viewsDomains = {
            page1: ['fr.cnes.isis'],
            page2: ['fr.cnes.isis'],
          };
          const pages = {
            page1: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: 'fr.cnes.isis.simupus',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page1',
            },
            page2: {
              domainName: '*',
              configurations: [
                {
                  entryPoints: [
                    {
                      connectedData: {
                        domain: 'fr.cnes.isis.simupus',
                      },
                    },
                  ],
                },
              ],
              pageId: 'page2',
            },
          };
          expect(getBorderColorForNav(workspaceDomain, pages, viewsDomains))
            .toEqual('#CCC');
        });
      });
      describe('getColorWithDomainDetermination', () => {
        test('returns no color when only wildcard', () => {
          const workspaceDomain = '*';
          const pageDomain = ['*'];
          const viewsDomains = ['*'];
          const epDomains = ['*'];
          expect(getColorWithDomainDetermination(
            workspaceDomain,
            pageDomain,
            viewsDomains,
            epDomains,
            'workspace'
          )).toEqual('#CCCCCC');
        });
        test('returns color when a domain is defined', () => {
          const workspaceDomain = 'fr.cnes.isis.simupus';
          const pageDomain = ['*'];
          const viewsDomains = ['*'];
          const epDomains = ['*'];
          expect(getColorWithDomainDetermination(
            workspaceDomain,
            pageDomain,
            viewsDomains,
            epDomains,
            'workspace'
          )).toEqual('#339933');
        });
      });
    });
  });
});
