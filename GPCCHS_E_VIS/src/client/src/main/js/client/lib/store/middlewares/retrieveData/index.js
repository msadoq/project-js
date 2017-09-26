// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// END-HISTORY
// ====================================================================

import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import retrieveLast from './retrieveLast';
import retrieveRange from './retrieveRange';
import forecastData from './forecastData';
import { get } from '../../../common/configurationManager';

const forecastTime = get('FORECAST');
const forecastTrigger = get('FORECAST_TRIGGER');

const createRetrieveDataMiddleware = ipc => pipeMiddlewares(
  retrieveRange(ipc),
  retrieveLast(ipc),
  forecastData(ipc, Number(forecastTime), Number(forecastTrigger))
);

export default createRetrieveDataMiddleware;
