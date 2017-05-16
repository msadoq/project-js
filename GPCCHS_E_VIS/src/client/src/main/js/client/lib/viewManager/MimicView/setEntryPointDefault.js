import { get } from 'common/parameters';

export default function (entryPoint) {
  return {
    ...entryPoint,
    connectedData: {
      ...entryPoint.connectedData,
      timeline: entryPoint.connectedData.timeline || get('WILDCARD_CHARACTER'),
      domain: entryPoint.connectedData.domain || get('WILDCARD_CHARACTER'),
    },
  };
}
