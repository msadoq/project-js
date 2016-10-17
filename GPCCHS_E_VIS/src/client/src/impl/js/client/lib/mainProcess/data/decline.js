import { reduce, each, set, get } from 'lodash';

import vivl from '../../../VIVL/main';
import formulaParser from '../../common/formula';
import remoteIdGenerator from '../../common/remoteId';
import localIdGenerator from '../../common/localId';
import domainsFilter from '../../common/domains';
import timelinesFilter from '../../common/sessions';
import getTimebarTimelines from './selectors/getTimebarTimelines';

/**
 * Decline cds for domainId and sessionId.
 *
 * Input connectedData:
 * {
 *   {
 *     // view
 *     type: string,
 *     timebarId: string,
 *     connectedData: [
 *       {
 *          formula: string,
 *          timeline: string,
 *          domain: string,
 *          filter: [{field: string, operator: string, operand: string}],
 *       },
 *     ],
 *   },
 * }
 *
 * Output:
 * {
 *   'remoteId': {
 *     dataId: {...},
 *     filter: [{field: string, operator: string, operand: string}],
 *     localIds: {
 *       'localId': {
 *         viewId: string,
 *         field: string,
 *         timebarId: string,
 *         offset: number,
 *         expectedInterval: [number, number],
 *       },
 *     },
 *   },
 * }
 *
 * @param domains
 * @param timebars
 * @param timelines
 * @param cds
 * @return {*}
 */
export default function decline(domains, timebars, timelines, cds) {
  // console.log(domains, timebars, timelines, cds)
  return reduce(cds, (list, { type, timebarId, connectedData }) => {
    // avoid domain, session declination for certain type of view (that display one value at a time)
    const noMulti = !vivl(type, 'isMultiDomainAndSessionSupported')();

    return reduce(connectedData, (sublist, cd) => {
      const forDomains = domainsFilter(domains, cd.domain);
      if (!forDomains.length) {
        return sublist;
      }
      if (forDomains.length > 1 && noMulti) {
        return sublist;
      }

      const forSessionIds = timelinesFilter(
        getTimebarTimelines(timebars, timelines, timebarId),
        cd.timeline
      );
      if (!forSessionIds.length) {
        return sublist;
      }
      if (forSessionIds.length > 1 && noMulti) {
        return sublist;
      }

      each(forDomains, (domainId) => {
        each(forSessionIds, ({ sessionId, offset }) => {
          // remoteId
          const p = formulaParser(cd.formula);
          const dataId = {
            catalog: p.catalog,
            parameterName: p.parameterName,
            comObject: p.comObject,
            domainId,
            sessionId,
          };
          const remoteId = remoteIdGenerator(dataId, cd.filter);

          // localId
          const localId = localIdGenerator(type, p.field, timebarId, offset);

          // de-duplication
          if (typeof sublist[remoteId] === 'undefined') {
            set(sublist, [remoteId], {
              dataId,
              filter: cd.filter,
              localIds: {},
            });
          } else if (typeof sublist[remoteId][localId] !== 'undefined') {
            // localId contains timebar and offset, so if already set, the same data was already
            // requested
            return;
          }

          // current visuWindow
          const visuWindow = get(timebars, [timebarId, 'visuWindow']);
          if (!visuWindow) {
            throw new Error('Unexpected store state');
          }

          const selector = vivl(type, 'getExpectedInterval');
          const interval = selector(
            visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
          );
          if (!interval) {
            throw new Error(`Unexpected function getExpectedInterval for view type ${type}`);
          }

          set(sublist, [remoteId, 'localIds', localId], {
            viewType: type,
            field: p.field,
            timebarId,
            offset,
            expectedInterval: interval,
          });
        });
      });

      return sublist;
    }, list);
  }, {});
}
