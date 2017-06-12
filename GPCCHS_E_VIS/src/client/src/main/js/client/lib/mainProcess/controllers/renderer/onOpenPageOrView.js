import { openPageOrView } from '../../../documentManager';
import { getStore } from '../../../store/createStore';

export default function ({ windowId, absolutePath }) {
  getStore().dispatch(openPageOrView({ absolutePath, windowId }));
}
