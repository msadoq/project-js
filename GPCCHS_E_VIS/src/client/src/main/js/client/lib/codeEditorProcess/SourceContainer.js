import { connect } from 'react-redux';
import {
  getViewContent,
  // getTextViewData,
  makeGetViewEntryPoints,
} from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import { closeHtmlEditor } from '../store/actions/editor';
import Source from './Source';

const getViewEntryPoints = makeGetViewEntryPoints();

const mapStateToProps = (state, { viewId }) => {
  const content = getViewContent(state, { viewId });
  const entryPoints = getViewEntryPoints(state, { viewId });
  return {
    content,
    entryPoints: entryPoints.map(ep => ep.name),
  };
};


const mapDispatchToProps = dispatch => ({
  updateContent: (viewId, value) => {
    dispatch(updateContent(viewId, value.html));
  },
  closeHtmlEditor: () => {
    dispatch(closeHtmlEditor());
  },
});

export const SourceContainer = connect(mapStateToProps, mapDispatchToProps)(Source);

export default SourceContainer;
