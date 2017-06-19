import { openPageOrView } from '../../../documentManager';
import { getStore } from '../../store';

export default function ({ windowId, absolutePath }) {
  getStore().dispatch(openPageOrView({ absolutePath, windowId }));
}
