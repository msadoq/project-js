import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SaveAgentModal from './SaveAgentModal';
import { getWorkspaceFile, getWorkspaceIsModified, getWorkspaceIsNew } from '../../../store/reducers/hsc';
import { getPagesWithViews } from '../../../store/selectors/pages';
import { askSaveView } from '../../../store/actions/views';
import { askSavePage } from '../../../store/actions/pages';
import { askSaveWorkspace } from '../../../store/actions/hsc';

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

const SaveAgentModalContainer = connect(mapStateToProps, mapDispatchToProps)(SaveAgentModal);
SaveAgentModalContainer.propTypes = {
  pageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SaveAgentModalContainer;
