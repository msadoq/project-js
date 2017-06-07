/* eslint-disable no-unused-expressions */
import { isV4 } from '../common/test';
import { createBlankWorkspace } from './createBlankWorkspace';

describe('documentManager:createBlankWorkspace', () => {
  const workspace = createBlankWorkspace();
  it('creates blank workspace with 1 window and 1 focused page', () => {
    expect(workspace.windows).toHaveLength(1);
    const window = workspace.windows[0];
    expect(isV4(window.focusedPage)).toBe(true);
    expect(isV4(window.uuid)).toBe(true);
    expect(window.focusedPage).toEqual(window.pages[0]);
  });
  it('creates a blank workspace with 1 page', () => {
    expect(workspace.pages).toHaveLength(1);
    const page = workspace.pages[0];
    expect(isV4(page.timebarUuid)).toBe(true);
    expect(isV4(page.uuid)).toBe(true);
  });
  it('creates a blank workspace with 1 timebar', () => {
    expect(workspace.timebars).toHaveLength(1);
    const timebar = workspace.timebars[0];
    expect(isV4(timebar.uuid)).toBe(true);
  });
  it('creates a blank workspace without views', () => {
    expect(workspace.views).toBeFalsy();
  });
});
