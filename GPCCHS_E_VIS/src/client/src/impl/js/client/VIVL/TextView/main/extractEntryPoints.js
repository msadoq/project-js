import _reduce from 'lodash/reduce';
import _first from 'lodash/first';

// import debug from '../../../lib/common/debug/mainDebug';
import applyDomainsAndTimebar from '../../../lib/common/data/map/applyDomainsAndTimebar';

// const logger = debug('data:map:text:extractEntryPoints');

export default function extractEntryPoints(
  entryPoints, timebarId, timelines, visuWindow, domains
) {
  return _reduce(entryPoints, (sublist, ep) => {
    const { name } = ep;

    const cds = applyDomainsAndTimebar(
      ep.connectedData, 'TextView', timebarId, visuWindow, timelines, domains, false
    );
    if (!Object.keys(cds).length) {
      return sublist;
    }

    // get first remoteId/localId
    const remoteId = _first(Object.keys(cds));
    const remoteIdData = cds[remoteId];
    const localId = _first(Object.keys(remoteIdData.localIds));
    const { field, expectedInterval } = remoteIdData.localIds[localId];

    return Object.assign(sublist, {
      [name]: {
        remoteId,
        field,
        expectedInterval,
      },
    });
  }, {});
}
