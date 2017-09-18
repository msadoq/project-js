import { connect } from 'react-redux';
import { getViewType } from '../store/reducers/views';
import { getConfigurationByViewId } from '../viewManager';
import { getViewEntryPointsName } from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import { closeCodeEditor } from '../store/actions/editor';
import Source from './Source';

const mapStateToProps = (state, { viewId }) => {
  const type = getViewType(state, { viewId });
  const configuration = getConfigurationByViewId(state, { viewId });
  const entryPointsName = getViewEntryPointsName(state, { viewId });
  return {
    content: configuration.content,
    entryPointsName,
    type,
  };
};

const mapDispatchToProps = dispatch => ({
  updateContent: (viewId, value) => {
    dispatch(updateContent(viewId, value.html));
  },
  closeCodeEditor: () => {
    dispatch(closeCodeEditor());
  },
});

export const SourceContainer = connect(mapStateToProps, mapDispatchToProps)(Source);

export default SourceContainer;
