// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Refactor window management in main process in a viewManager
// END-HISTORY
// ====================================================================

import { screen } from 'electron';

export default function (width, height) {
  const bounds = screen.getPrimaryDisplay().bounds;
  const x = bounds.x + ((bounds.width - width) / 2);
  const y = bounds.y + ((bounds.height - height) / 2);
  return { x, y };
}
