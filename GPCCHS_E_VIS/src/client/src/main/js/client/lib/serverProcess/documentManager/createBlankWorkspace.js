import { v4 } from 'uuid';

const createBlankWorkspace = () => {
  const wsUuid = v4();
  const tbUuid = v4();
  const pgUuid = v4();
  const window = {
    title: 'Unknown',
    type: 'documentWindow',
    focusedPage: pgUuid,
    pages: [pgUuid],
    geometry: {
      w: 1200,
      h: 900,
      x: 10,
      y: 10,
    },
  };
  const timebar = {
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
  const page = { type: 'Page',
    title: 'Unknown',
    hideBorders: false,
    timebarUuid: tbUuid,
    timebarId: 'TB1',
  };
  const workspace = {
    isModified: true,
    windows: [Object.assign(window, { uuid: wsUuid })],
    timebars: [Object.assign(timebar, { uuid: tbUuid })],
    pages: [Object.assign(page, { uuid: pgUuid })],
  };
  return workspace;
};

export default {
  createBlankWorkspace,
};