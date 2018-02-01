// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : A blank workspace can be opened without pages
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';

const createBlankWorkspace = ({ noPage = false } = {}) => {
  const winUuid = v4();
  const tbUuid = v4();
  const pgUuid = v4();
  const window = {
    uuid: winUuid,
    title: 'Unknown',
    type: 'documentWindow',
    focusedPage: noPage ? null : pgUuid,
    pages: noPage ? [] : [pgUuid],
    geometry: {
      w: 1200,
      h: 900,
      x: 10,
      y: 10,
    },
  };
  const timebar = {
    uuid: tbUuid,
    type: 'timeBarConfiguration',
    id: 'TB1',
    mode: 'Normal',
    visuWindow: {
      lower: Date.now() - (5 * 60 * 1000),
      upper: Date.now() + (5 * 60 * 1000),
      current: Date.now(),
    },
    slideWindow: {
      lower: Date.now() - (5 * 60 * 1000),
      upper: Date.now() + (5 * 60 * 1000),
    },
    rulerStart: Date.now() - (10 * 60 * 1000),
    rulerResolution: 11250,
    speed: 1.0,
    offsetFromUTC: 0,
    timelines: [],
  };
  const page = {
    uuid: pgUuid,
    type: 'Page',
    title: 'Unknown',
    hideBorders: false,
    timebarUuid: tbUuid,
    timebarId: 'TB1',
  };
  const workspace = {
    isModified: true,
    windows: [window],
    timebars: [timebar],
    pages: noPage ? [] : [page],
  };
  return workspace;
};

export default {
  createBlankWorkspace,
};
