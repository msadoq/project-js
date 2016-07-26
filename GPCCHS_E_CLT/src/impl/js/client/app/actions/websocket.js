export const WEBSOCKET_STATUS = 'WEBSOCKET_STATUS';

export function websocketStatus(status, err) {
  return {
    type: WEBSOCKET_STATUS,
    status,
    err,
  };
}
