import { renderer } from 'mainProcess/ipc';

export default function onSingletonPatch(singleton) {
  renderer.sendSingletonToRenderer(singleton);
}
