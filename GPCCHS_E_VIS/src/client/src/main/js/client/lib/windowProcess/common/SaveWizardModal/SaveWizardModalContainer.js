// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix SaveWizard save workspace .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename SaveAgent in SaveWizard .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getWorkspaceFile, getWorkspaceIsModified, getWorkspaceIsNew } from 'store/reducers/hsc';
import { getPagesWithViews } from 'store/selectors/pages';
import { askSaveView } from 'store/actions/views';
import { askSavePage } from 'store/actions/pages';
import { askSaveWorkspace } from 'store/actions/hsc';
import SaveWizardModal from './SaveWizardModal';

const mapStateToProps = createStructuredSelector({
  pages: getPagesWithViews,
  workspaceFile: getWorkspaceFile,
  workspaceIsModified: getWorkspaceIsModified,
  workspaceIsNew: getWorkspaceIsNew,
});

const mapDispatchToProps = {
  askSaveView,
  askSavePage,
  askSaveWorkspace,
};

const SaveWizardModalContainer = connect(mapStateToProps, mapDispatchToProps)(SaveWizardModal);
SaveWizardModalContainer.propTypes = {
  pageIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  viewIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SaveWizardModalContainer;
