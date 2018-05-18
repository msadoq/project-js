import _uniq from 'lodash/uniq';
import _pull from 'lodash/pull';

/**
 * Search the domain for coloration
 * @param workspaceDomain
 * @param pagesDomains array of uniq domains for pages
 * @param viewsDomains array of uniq domains for views
 * @param EpsDomains array of uniq domains for EntryPoint
 * @param from enum string (workspace, page, view)
 * @returns string domain
 */
// eslint-disable-next-line complexity
const domainDeterminationForColor = (
  workspaceDomain,
  pagesDomains,
  viewsDomains,
  EpsDomains,
  from
) => {
  let domain;
  switch (from) {
    case 'workspace':
      if (workspaceDomain !== '*') {
        domain = workspaceDomain;
      } else if (pagesDomains.length > 1) {
        domain = 'unresolved';
      } else if (pagesDomains[0] !== '*') {
        domain = pagesDomains[0];
      } else if (viewsDomains.length > 1) {
        domain = 'unresolved';
      } else if (viewsDomains[0] !== '*') {
        domain = viewsDomains[0];
      } else if (EpsDomains.length > 1) {
        domain = 'unresolved';
      } else if (EpsDomains[0] !== '*') {
        domain = EpsDomains[0];
      } else {
        domain = 'unresolved';
      }
      break;
    case 'page':
      if (workspaceDomain !== '*') {
        domain = workspaceDomain;
      } else if (pagesDomains[0] !== '*') {
        domain = pagesDomains[0];
      } else if (viewsDomains.length > 1) {
        domain = 'unresolved';
      } else if (viewsDomains[0] !== '*') {
        domain = viewsDomains[0];
      } else if (EpsDomains.length > 1) {
        domain = 'unresolved';
      } else if (EpsDomains[0] !== '*') {
        domain = EpsDomains[0];
      } else {
        domain = 'unresolved';
      }
      break;
    case 'view':
      if (workspaceDomain !== '*') {
        domain = workspaceDomain;
      } else if (pagesDomains[0] !== '*') {
        domain = pagesDomains[0];
      } else if (viewsDomains[0] !== '*') {
        domain = viewsDomains[0];
      } else if (EpsDomains.length > 1) {
        domain = 'unresolved';
      } else if (EpsDomains[0] !== '*') {
        domain = EpsDomains[0];
      } else {
        domain = 'unresolved';
      }
      break;
    default:
      domain = 'unresolved';
      break;
  }
  return domain;
};

/**
 * allows to know if it can be displayed according to the given domains
 * @param string workspaceDomain
 * @param string pagesDomain
 * @param string viewsDomain
 * @param string epDomain
 * @returns boolean
 */
const domainDeterminationForDisplay = (
  workspaceDomain,
  pagesDomain,
  viewDomain,
  epDomain
) => {
  const domains = _pull(_uniq([workspaceDomain, pagesDomain, viewDomain]), '*');
  let display = false;
  if (domains.length === 0) {
    display = true;
  } else if (domains.length === 1) {
    display = epDomain === domains[0] || epDomain === '*';
  }
  return display;
};

export default {
  domainDeterminationForColor,
  domainDeterminationForDisplay,
};
