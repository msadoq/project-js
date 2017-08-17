import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import retrieveLast from './retrieveLast';
import retrieveRange from './retrieveRange';
import forecastData from './forecastData';
import { get } from '../../../common/configurationManager';

const forecastTime = get('FORECAST');
const forecastTrigger = get('FORECAST_TRIGGER');

const createRetrieveDataMiddleware = (ipc, dataManager) => pipeMiddlewares(
  retrieveRange(ipc, dataManager),
  retrieveLast(ipc, dataManager),
  forecastData(ipc, forecastTime, forecastTrigger)
);

export default createRetrieveDataMiddleware;
