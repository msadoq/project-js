// eslint-disable-next-line import/prefer-default-export
export function getStatus(state, identity) {
  const identityObject = state.hss[identity];
  if (!identityObject) {
    return { status: 'disconnected' };
  }
  return identityObject;
}
