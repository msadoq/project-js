import React, { PropTypes } from 'react';
import _ from 'lodash/fp';

import { pagePropTypes } from '../propTypes';

import SaveWorkspace from './SaveWorkspace';
import SavePage from './SavePage';
import SaveView from './SaveView';

const SaveWizard = ({
  askSavePage, askSaveView, askSaveWorkspace,
  pages, workspaceFile, workspaceIsModified, workspaceIsNew,
}) => (
  <div>
    <SaveWorkspace
      disableSaveButton={_.some(p => !p.absolutePath && !p.oId, pages)}
      askSaveWorkspace={askSaveWorkspace}
      workspaceFile={workspaceFile}
      workspaceIsModified={workspaceIsModified}
      workspaceIsNew={workspaceIsNew}
    />
    {
      pages.map(page => (
        <SavePage key={page.uuid} askSavePage={askSavePage} page={page} boldTitle={!workspaceFile}>
          {
            page.views.map(view => (
              <SaveView key={view.uuid} view={view} askSaveView={askSaveView} />
            ))
          }
        </SavePage>
      ))
    }
  </div>
);
SaveWizard.propTypes = {
  pages: PropTypes.arrayOf(pagePropTypes).isRequired,
  askSavePage: PropTypes.func.isRequired,
  askSaveView: PropTypes.func.isRequired,
  askSaveWorkspace: PropTypes.func.isRequired,
  workspaceFile: PropTypes.string.isRequired,
  workspaceIsModified: PropTypes.bool.isRequired,
  workspaceIsNew: PropTypes.bool.isRequired,
};

export default SaveWizard;
