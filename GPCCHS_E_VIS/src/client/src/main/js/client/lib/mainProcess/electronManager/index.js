// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement dialogObserver in mainProcess .
// END-HISTORY
// ====================================================================

import makeDialogObserver from './dialogObserver';

export default function makeElectronObserver(store) {
  const dialogObserver = makeDialogObserver(store);
  return () => {
    dialogObserver();
  };
}
