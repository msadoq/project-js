/* eslint-disable no-unused-expressions */
import { should, isV4 } from '../common/test';
import { createBlankWorkspace } from './createBlankWorkspace';

describe('documentManager:createBlankWorkspace', () => {
  const workspace = createBlankWorkspace();
  it('creates blank workspace with 1 window and 1 focused page', () => {
    workspace.windows.should.have.length(1);
    const window = workspace.windows[0];
    isV4(window.focusedPage).should.be.true;
    isV4(window.uuid).should.be.true;
    window.focusedPage.should.be.eql(window.pages[0]);
  });
  it('creates a blank workspace with 1 page', () => {
    workspace.pages.should.have.length(1);
    const page = workspace.pages[0];
    isV4(page.timebarUuid).should.be.true;
    isV4(page.uuid).should.be.true;
  });
  it('creates a blank workspace with 1 timebar', () => {
    workspace.timebars.should.have.length(1);
    const timebar = workspace.timebars[0];
    isV4(timebar.uuid).should.be.true;
  });
  it('creates a blank workspace without views', () => {
    should.not.exist(workspace.views);
  });
});
