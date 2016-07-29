export const WEBSOCKET_STATUS = 'WEBSOCKET_STATUS';
export const WEBSOCKET_STUB_TOGGLE = 'WEBSOCKET_STUB_TOGGLE';

export function websocketStatus(status, err) {
  return {
    type: WEBSOCKET_STATUS,
    status,
    err,
  };
}

export function websocketStubToggle() {
  return {
    type: WEBSOCKET_STUB_TOGGLE,
  };
}
