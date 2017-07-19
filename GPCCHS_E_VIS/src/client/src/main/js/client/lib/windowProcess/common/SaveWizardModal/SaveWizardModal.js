import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash/fp';

import { pagePropTypes, buttonPropTypes } from './propTypes';
import ConfirmationButton from './ConfirmationButton';
import SaveWizard from './SaveWizard';

export default class SaveWizardModal extends PureComponent {
  static propTypes = {
    documentType: PropTypes.oneOf(['workspace', 'window', 'page']).isRequired,
    workspaceFile: PropTypes.string,
    workspaceIsModified: PropTypes.bool.isRequired,
    workspaceIsNew: PropTypes.bool.isRequired,
    askSaveView: PropTypes.func.isRequired,
    askSavePage: PropTypes.func.isRequired,
    askSaveWorkspace: PropTypes.func.isRequired,
    pages: PropTypes.arrayOf(pagePropTypes).isRequired,
    closeModal: PropTypes.func.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      savedDocuments: buttonPropTypes.isRequired,
      unsavedDocuments: buttonPropTypes.isRequired,
    }).isRequired),
  }

  static defaultProps = {
    workspaceFile: '',
    buttons: [],
  }

  render() {
    const {
      closeModal, pages, buttons, documentType,
      workspaceFile, workspaceIsModified, workspaceIsNew,
      askSaveView, askSavePage, askSaveWorkspace,
    } = this.props;
    const documentsAreModified = _.anyPass([
      _.some('isModified'),
      _.pipe(_.flatMap('views'), _.some('isModified')),
      () => documentType === 'workspace' && workspaceIsModified,
    ])(pages);
    return (
      <div>
        <SaveWizard
          isWorkspace={documentType === 'workspace'}
          workspaceFile={workspaceFile}
          workspaceIsModified={workspaceIsModified}
          workspaceIsNew={workspaceIsNew}
          pages={pages}
          askSaveView={askSaveView}
          askSavePage={askSavePage}
          askSaveWorkspace={askSaveWorkspace}
        />
        <div className="text-center">
          {
            buttons.map(({ unsavedDocuments, savedDocuments }) => {
              const buttonProps = documentsAreModified ? unsavedDocuments : savedDocuments;
              return (
                <ConfirmationButton
                  {...buttonProps}
                  closeModal={closeModal}
                  key={unsavedDocuments.label}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
