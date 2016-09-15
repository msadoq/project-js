import debug from '../utils/debug';
// import { getStore } from '../store/mainStore';

const logger = debug('main:controller');

export default function controller(event, payload) {
  switch (event) {
    default:
      logger.error('Received not yet implemented event', event);
  }
}
