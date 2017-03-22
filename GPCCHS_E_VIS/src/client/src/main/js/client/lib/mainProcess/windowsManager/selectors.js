import { getEditorTitle } from '../../store/reducers/editor';
import { getView } from '../../store/reducers/views';

// specific to windowManager/coreEditor
const getEditorWindowTitle = (state, { viewId }) => {
  if (!viewId) {
    return '';
  }

  const props = { viewId };
  const view = getView(state, props);
  if (!view || !view.configuration) {
    return '';
  }

  return `${getEditorTitle(state)} - ${view.title}`;
};

export default {
  getEditorWindowTitle,
};
