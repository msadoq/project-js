import { connect } from 'react-redux';
import { getViewContent } from '../store/reducers/views';
import { getViewEntryPointsName } from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import { closeHtmlEditor } from '../store/actions/editor';
import Source from './Source';

const mapStateToProps = (state, { viewId }) => {
  const content = getViewContent(state, { viewId });
  // console.log('CONTENT: ', content);
  const entryPointsName = getViewEntryPointsName(state, { viewId });
  // console.log('EP NAME: ', entryPointsName);
  return {
    content,
    entryPointsName,
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
