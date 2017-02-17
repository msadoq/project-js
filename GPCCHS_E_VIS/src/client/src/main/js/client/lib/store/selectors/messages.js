import 'reselect';

export const getGlobalMessages = state => state.messages.global;
export const getMessages = (state, { containerId }) => state.messages[containerId];
