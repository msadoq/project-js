// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix SaveWizard save workspace .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Refacto SaveWizardModal component . .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

import { pagePropTypes } from '../propTypes';

import SaveWorkspace from './SaveWorkspace';
import SavePage from './SavePage';
import SaveView from './SaveView';

const SaveWizard = ({
  askSavePage, askSaveView, askSaveWorkspace, isWorkspace,
  pages, workspaceFile, workspaceIsModified, workspaceIsNew,
}) => (
  <div>
    <SaveWorkspace
      disableSaveButton={_.some(p => !p.absolutePath && !p.oId, pages)}
      askSaveWorkspace={askSaveWorkspace}
      isWorkspace={isWorkspace}
      workspaceFile={workspaceFile}
      workspaceIsModified={workspaceIsModified}
      workspaceIsNew={workspaceIsNew}
    />
    {
      pages.map(page => (
        <SavePage key={page.uuid} askSavePage={askSavePage} page={page} boldTitle={!isWorkspace}>
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
  isWorkspace: PropTypes.bool.isRequired,
  workspaceFile: PropTypes.string.isRequired,
  workspaceIsModified: PropTypes.bool.isRequired,
  workspaceIsNew: PropTypes.bool.isRequired,
};

export default SaveWizard;
