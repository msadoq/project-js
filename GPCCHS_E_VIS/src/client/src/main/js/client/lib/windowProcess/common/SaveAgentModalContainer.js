import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SaveAgentModal from './SaveAgentModal';
import { getWorkspaceFile, getWorkspaceIsModified, getWorkspaceIsNew } from '../../store/reducers/hsc';
import { getPagesWithViews } from '../../store/selectors/pages';
import { askSaveView } from '../../store/actions/views';
import { askSavePage } from '../../store/actions/pages';
import { askSaveWorkspace } from '../../store/actions/hsc';

const mapStateToProps = createStructuredSelector({
  pages: getPagesWithViews,
  workspaceFile: (state, { documentType }) => (
    documentType === 'workspace' ? getWorkspaceFile(state) : undefined
  ),
  workspaceIsModified: getWorkspaceIsModified,
  workspaceIsNew: getWorkspaceIsNew,
});

const mapDispatchToProps = {
  askSaveView,
  askSavePage,
  askSaveWorkspace,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveAgentModal);
