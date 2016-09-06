import debug from '../app/utils/debug';
import Primus from '../../../../../../GPCCHS_D_SVR/src/impl/js/server/primus.client';

const logger = debug('communication:websocket');

let instance;

export function connect() {
  if (!instance) {
    logger.info('trying open connection to', process.env.HSS);
    instance = new Primus(process.env.HSS); // TODO pass query string in URL to identify this as main socket, handle on client side
    instance.on('open', () => {
      logger.info('connected!');
    });
    instance.on('end', () => {
      logger.info('closed!');
    });
    instance.on('data', data => {
      logger.info('incoming data', data);
    });
    instance.on('error', err => {
      logger.error('error', err.stack);
    });
  }

  return instance;
}

export function disconnect() {
  if (instance) {
    instance.destroy();

    // ask gc to destroy primus instance
    instance = null;
  }
}
