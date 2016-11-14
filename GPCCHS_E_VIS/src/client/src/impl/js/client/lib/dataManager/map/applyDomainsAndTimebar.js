import _each from 'lodash/each';
import _set from 'lodash/set';

import debug from '../../common/debug/mainDebug';
import formulaParser from '../../common/formula';
import remoteIdGenerator from '../../common/remoteId';
import localIdGenerator from '../../common/localId';
import domainsFilter from '../../common/domains';
import timelinesFilter from '../../common/sessions';
import structures from '../structures';

const logger = debug('data:map:applyDomainsAndTimebar');

export default function applyDomainsAndTimebar(
  connectedData, structureType, timebarId, visuWindow, timelines, domains, allowMultiple
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
      const remoteId = remoteIdGenerator(structureType, dataId, filter);

      // localId
      const localId = localIdGenerator(p.field, timebarId, offset);

      // de-duplication
      if (typeof list[remoteId] === 'undefined') {
        _set(list, [remoteId], {
          structureType,
          dataId,
          filter, // TODO : filter"s"
          localIds: {},
        });
      } else if (typeof list[remoteId][localId] !== 'undefined') {
        // localId contains timebar and offset, so if already _set, the same data was already
        // requested
        return;
      }

      const selector = structures(structureType, 'getExpectedInterval');
      const interval = selector(
        visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
      );
      if (!interval) {
        return logger.debug('no valid expected interval for this connectedData', structureType);
      }

      _set(list, [remoteId, 'localIds', localId], {
        field: p.field,
        timebarId,
        offset,
        expectedInterval: interval,
      });
    });
  });

  return list;
}
