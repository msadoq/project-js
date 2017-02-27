import { get } from 'common/parameters';

export default function (entryPoint) {
  return {
    ...entryPoint,
    connectedDataX: {
      ...entryPoint.connectedDataX,
      timeline: entryPoint.connectedDataX.timeline || get('WILDCARD_CHARACTER'),
      domain: entryPoint.connectedDataX.domain || get('WILDCARD_CHARACTER'),
    },
    connectedDataY: {
      ...entryPoint.connectedDataY,
      timeline: entryPoint.connectedDataY.timeline || get('WILDCARD_CHARACTER'),
      domain: entryPoint.connectedDataY.domain || get('WILDCARD_CHARACTER'),
    },
  };
}
