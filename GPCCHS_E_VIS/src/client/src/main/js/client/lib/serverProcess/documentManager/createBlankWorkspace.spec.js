// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { createBlankWorkspace } from './createBlankWorkspace';

describe('documentManager:createBlankWorkspace', () => {
  const workspace = createBlankWorkspace();
  test('creates blank workspace with 1 window and 1 focused page', () => {
    expect(workspace.windows).toHaveLength(1);
    const window = workspace.windows[0];
    expect(window.focusedPage).toBeAnUuid();
    expect(window.uuid).toBeAnUuid();
    expect(window.focusedPage).toEqual(window.pages[0]);
  });
  test('creates a blank workspace with 1 page', () => {
    expect(workspace.pages).toHaveLength(1);
    const page = workspace.pages[0];
    expect(page.timebarUuid).toBeAnUuid();
    expect(page.uuid).toBeAnUuid();
  });
  test('creates a blank workspace with 1 timebar', () => {
    expect(workspace.timebars).toHaveLength(1);
    const timebar = workspace.timebars[0];
    expect(timebar.uuid).toBeAnUuid();
  });
  test('creates a blank workspace without views', () => {
    expect(workspace.views).toBeFalsy();
  });
});
