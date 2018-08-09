// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData
//  middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import { get } from 'common/configurationManager';
import retrievePus from './retrievePus';
import forecastData from './forecastData';

const forecastTime = get('FORECAST');
const forecastTrigger = get('FORECAST_TRIGGER');

const createRetrievePusDataMiddleware = ipc => pipeMiddlewares(
  retrievePus(ipc),
  forecastData(ipc, Number(forecastTime), Number(forecastTrigger))
);

export default createRetrievePusDataMiddleware;
