import _ from 'lodash/fp';
import { join, dirname } from 'path';
import { LOG_DOCUMENT_SAVE } from '../constants';

import { getWindows } from '../store/reducers/windows';
import { getPage } from '../store/reducers/pages';
import { getTimebars, getTimebarId } from '../store/reducers/timebars';
import { getTimebarTimelines } from '../store/reducers/timebarTimelines';
import { getTimeline } from '../store/reducers/timelines';
import {
  getWorkspaceFile,
  getWorkspaceFolder,
  getDomainName,
  getSessionName,
} from '../store/reducers/hsc';

import validation from './validation';
import { server } from '../mainProcess/ipc';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';

const getPageLocation = ({ oId, path, absolutePath }) => {
  if (oId) {
    return { oId };
  }
  return { path: absolutePath || path };
};

const prepareWindows = state => _.map(win => ({
  type: 'documentWindow',
  title: win.title,
  geometry: win.geometry,
  pages: win.pages.map((pageId) => {
    const page = getPage(state, { pageId });
    const pageLocation = getPageLocation(page);
    const { timebarUuid } = page;
    return {
      ...pageLocation,
      timebarId: getTimebarId(state, { timebarUuid }),
    };
  }),
}), getWindows(state));

const prepareTimebars = state => _.map(timebar => ({
  id: timebar.id,
  type: 'timeBarConfiguration',
  rulerResolution: timebar.rulerResolution,
  speed: timebar.speed,
  masterId: timebar.masterId,
  mode: timebar.mode,
  timelines: _.map((timelineUuid) => {
    const timeline = getTimeline(state, { timelineUuid });
    return _.omit('uuid', timeline);
  }, getTimebarTimelines(state, { timebarUuid: timebar.uuid })),
}), getTimebars(state));

const prepareWorkspace = state => ({
  type: 'WorkSpace',
  windows: prepareWindows(state),
  timebars: prepareTimebars(state),
  sessionName: getSessionName(state),
  domainName: getDomainName(state),
});

const writeWorkspaceAs = (state, path, callback) => {
  createFolder(dirname(path), (errFolderCreation) => {
    if (errFolderCreation) {
      return callback(errFolderCreation);
    }

    const workspace = prepareWorkspace(state, path);
    // validation
    const validationError = validation('workspace', workspace);
    if (validationError) {
      return callback(validationError);
    }
    // save file
    return writeDocument(path, workspace, (err) => {
      if (err) {
        return callback(err);
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'workspace', path);
      return callback(null);
    });
  });
};

const writeWorkspace = (state, filePath, callback) => {
  let path;
  if (!filePath || filePath === '') {
    const file = getWorkspaceFile(state);
    const folder = getWorkspaceFolder(state);
    if (!file || !folder) {
      return callback(new Error('Unable to get path for saving workspace'));
    }
    path = join(folder, file);
  } else {
    path = filePath;
  }
  return writeWorkspaceAs(state, path, callback);
};

export default {
  writeWorkspace,
  writeWorkspaceAs,
};
