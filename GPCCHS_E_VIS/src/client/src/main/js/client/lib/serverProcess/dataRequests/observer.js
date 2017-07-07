import execution from '../../common/logManager/execution';
import dataMapGenerator from '../../dataManager/map';
import { getWindowsOpened, getIsWorkspaceOpening } from '../../store/reducers/hsc';
import makeDataSubscriptions from './dataSubscriptions';
import makeDataQueries from './dataQueries';
import dataMapSingleton from '../models/dataMapSingleton';

/**
 * Note, dataMap keys:
 * - perView
 * - perRemoteId
 * - expectedIntervals
 */

export default function makeDataRequestsObserver(store) {
  const dataSubscriptions = makeDataSubscriptions();
  const dataQueries = makeDataQueries();
  let previous; // previous dataMap
  return function dataRequestsObserver() {
    const state = store.getState();

    // skip is workspace is loading or no windows was already loaded
    if (getIsWorkspaceOpening(state) === true && getWindowsOpened(state) === false) {
      return;
    }

    const profile = execution('dataMap:store:observer');

    // data map
    // Note: could change on many windows, pages or views update like layouts or panels, but since
    //       dataMap is very fast and this update occurs only on user manual actions the additionnal
    //       cost of this observer is far from null
    profile.start('dataMap generation');
    const dataMap = dataMapGenerator(state);
    profile.stop('dataMap generation');

    // skip if the dataMap is the same as previous run
    if (dataMap === previous) {
      profile.print();
      return;
    }
    // Update datamap singleton
    dataMapSingleton.set(dataMap);

    // run dataSubscriptions observer (create and remove pub/sub subscriptions)
    profile.start('subscriptions');
    dataSubscriptions(dataMap, previous); // TODO dbrugne issue when remoteId is no longer in dataMap (user change page) and interval is in cache when i recevie new pub/sub values
    profile.stop('subscriptions');

    // run dataQueries observer (produce dataRequest for DC)
    profile.start('queries');
    dataQueries(dataMap, previous, state);
    profile.stop('queries');

    // store dataMap for next observer execution
    previous = dataMap;

    profile.print();
  };
}
