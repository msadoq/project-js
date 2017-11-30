import { PropTypes } from 'react';

const { shape, number, string, arrayOf } = PropTypes;

export const domainType = shape({
  domainId: number,
  itemNamespace: string,
  name: string,
  oid: string,
  parentDomainId: number,
});

export const domainsType = arrayOf(domainType.isRequired);

export const timelineType = shape({
  color: string,
  id: string,
  kind: string,
  offset: number,
  sessionId: number,
  timelineUuid: string,
});

export const timelinesType = arrayOf(timelineType.isRequired);
