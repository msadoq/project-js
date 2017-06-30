import makeDialogObserver from './dialogObserver';

export default function makeElectronObserver(store) {
  const dialogObserver = makeDialogObserver(store);
  return () => {
    dialogObserver();
  };
}
