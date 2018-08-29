import parsePusEntryPoint from 'viewManager/common/pus/parsePusEntryPoint';
import { VM_VIEW_PUS12 } from 'viewManager/constants';

export default function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterTimelineSession,
  timebarUuid,
  viewType,
  viewDomain,
  pageDomain,
  workspaceDomain,
  viewSessionName,
  pageSessionName,
  workspaceSessionName
) {
  return parsePusEntryPoint({
    domains,
    sessions,
    timelines,
    entryPoint,
    masterTimelineSession,
    timebarUuid,
    viewType,
    viewDomain,
    pageDomain,
    workspaceDomain,
    viewSessionName,
    pageSessionName,
    workspaceSessionName,
    allApids: false,
    pusType: VM_VIEW_PUS12,
  });
}
