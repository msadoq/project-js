import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import { get } from 'common/configurationManager';
import retrieveLast from './retrieveLast';
import retrieveRange from './retrieveRange';
import forecastData from './forecastData';

const forecastTime = get('FORECAST');
const forecastTrigger = get('FORECAST_TRIGGER');

const createRetrieveDataMiddleware = ipc => pipeMiddlewares(
  retrieveRange(ipc),
  retrieveLast(ipc),
  forecastData(ipc, Number(forecastTime), Number(forecastTrigger))
);

export default createRetrieveDataMiddleware;
