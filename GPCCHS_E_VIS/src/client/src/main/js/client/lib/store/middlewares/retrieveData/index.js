import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import retrieveLast from './retrieveLast';
import retrieveRange from './retrieveRange';

const createRetrieveDataMiddleware = () => pipeMiddlewares(
  retrieveRange(),
  retrieveLast()
);

export default createRetrieveDataMiddleware;
