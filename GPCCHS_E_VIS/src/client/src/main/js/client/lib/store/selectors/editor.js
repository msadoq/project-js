import _get from 'lodash/get';

export const getViewId = state => _get(state, ['editor', 'textViewId'], {});
export const test = state => _get(state, ['editor', 'textViewId'], {});
