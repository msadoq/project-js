export const MAIN_WEBSOCKET_STATUS = 'MAIN_WEBSOCKET_STATUS';

export function mainWebsocketStatus(status, err) {
  return {
    type: MAIN_WEBSOCKET_STATUS,
    status,
    err,
  };
}
