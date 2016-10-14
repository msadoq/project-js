import { reduce } from 'lodash';
import getEntryPointsFromState from './getEntryPointsFromState';

/**
 * Returns cache data for given view.
 *
 * {
 *   'name': [{x, y}],
 * }
 *
 * @param state
 * @param configuration
 * @param timebarId
 * @return {*}
 */
export default function getDataFromCache(state, configuration, timebarId) {
  // console.log('PASS HERE', 'plot', 'getDataFromCache', configuration, timebarId);
  return {};
  // return reduce(getEntryPointsFromState(configuration), (list, ep) => {
  //   // both axes should have a valid connectedData
  //   if (!ep || !ep.connectedDataX || !ep.connectedDataY) {
  //     return list;
  //   }
  //
  //   return Object.assign(list, { [ep.name]: {
  //     x: ep.connectedDataX,
  //     y: ep.connectedDataY,
  //   } });
  //
  //   // const x = formula(ep.connectedDataX.formula);
  //   // const y = formula(ep.connectedDataY.formula);
  //   //
  //   // if (
  //   //   x.catalog === y.catalog
  //   //   && x.parameterName === y.parameterName
  //   //   && x.comObject === y.comObject
  //   // ) {
  //   //   // same TBD parameter
  //   // }
  //   //
  //   // // parametric entryPoint
  //   // const entryPoints = {
  //   //   x: ep.connectedDataX,
  //   //   y: ep.connectedDataY,
  //   // };
  //   // return Object.assign(list, { [ep.name]: entryPoints });
  // }, {});
}
