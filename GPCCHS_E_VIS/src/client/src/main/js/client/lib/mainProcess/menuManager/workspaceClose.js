import { app } from 'electron';
import { allDocumentsAreSaved } from './workspaceOpen';
import { getStore } from '../store';
import { add as addMessage } from '../../store/actions/messages';

export default { workspaceClose };

function workspaceClose() {
  const store = getStore();
  const { dispatch } = store;

  allDocumentsAreSaved(store, 'Closing workspace', (err) => {
    if (!err) {
      app.quit();
    }
    if (typeof err === 'string') {
      return dispatch(addMessage(
        'global',
        'warning',
        err
      ));
    }
  });
}
