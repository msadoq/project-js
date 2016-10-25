import _each from 'lodash/each';
import _set from 'lodash/set';

import vivl from '../../../../VIVL/main';
import debug from '../../debug/mainDebug';
import formulaParser from '../../formula';
import remoteIdGenerator from '../../remoteId';
import localIdGenerator from '../../localId';
import domainsFilter from '../../domains';
import timelinesFilter from '../../sessions';

const logger = debug('data:map:declineConnectedDatum');

export default function declineConnectedDatum(
  connectedData, type, timebarId, visuWindow, timelines, domains, allowMultiple
) {
  const { formula, domain, timeline, filter } = connectedData;

  // domains
  const forDomains = domainsFilter(domains, domain);
  if (!forDomains.length) {
    logger.debug('no domain for this connectedData', domain);
    return {};
  }
  if (forDomains.length > 1 && allowMultiple) {
    logger.debug('too many domains for this connectedData', domain);
    return {};
  }

  // sessions
  const forSessionIds = timelinesFilter(timelines, timeline);
  if (!forSessionIds.length) {
    logger.debug('no session for this connectedData', timeline);
    return {};
  }
  if (forSessionIds.length > 1 && allowMultiple) {
    logger.debug('too many sessions for this connectedData', timeline);
    return {};
  }

  // formula
  const p = formulaParser(formula);
  if (!p) {
    return {};
  }

  const list = {};

  _each(forDomains, (domainId) => {
    _each(forSessionIds, ({ sessionId, offset }) => {
      // remoteId
      const dataId = {
        catalog: p.catalog,
        parameterName: p.parameterName,
        comObject: p.comObject,
        domainId,
        sessionId,
      };
      const remoteId = remoteIdGenerator(dataId, filter);

      // localId
      const localId = localIdGenerator(type, p.field, timebarId, offset);

      // de-duplication
      if (typeof list[remoteId] === 'undefined') {
        _set(list, [remoteId], {
          dataId,
          filter, // TODO : filter"s"
          localIds: {},
        });
      } else if (typeof list[remoteId][localId] !== 'undefined') {
        // localId contains timebar and offset, so if already _set, the same data was already
        // requested
        return;
      }

      const selector = vivl(type, 'getExpectedInterval');
      const interval = selector(
        visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
      );
      if (!interval) {
        return logger.debug('no valid expected interval for this connectedData', type);
      }

      _set(list, [remoteId, 'localIds', localId], {
        viewType: type,
        field: p.field,
        timebarId,
        offset,
        expectedInterval: interval,
      });
    });
  });

  return list;
}
