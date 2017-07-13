import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash/fp';
import { Button, Label, Glyphicon, Row, Col } from 'react-bootstrap';
import styles from './SaveWizardModal.css';

const pagePropTypes = PropTypes.shape({
  title: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isModified: PropTypes.bool,
  views: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    isModified: PropTypes.bool,
  })).isRequired,
});

const SaveButton = (props) => {
  if (props.saved) {
    return (<Label bsStyle="success"><Glyphicon glyph="ok" /></Label>);
  }
  return (
    <Button
      onClick={props.onClick}
      className={styles.saveButton}
      bsStyle="primary"
      bsSize="xsmall"
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};
SaveButton.propTypes = {
  saved: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
SaveButton.defaultProps = {
  disabled: false,
};

const SaveWorkspace = (props) => {
  const {
    askSaveWorkspace,
    disableSaveButton,
    workspaceFile,
    workspaceIsModified,
    workspaceIsNew,
  } = props;
  if (!workspaceFile) {
    return null;
  }
  return (
    <Row className="mb5">
      <Col xs={2} />
      <Col xs={7}>
        <ul><li className={styles.bullet}><strong>{workspaceFile}</strong></li></ul>
      </Col>
      <Col className="" xs={3}>
        <SaveButton
          saved={!workspaceIsModified}
          onClick={() => askSaveWorkspace()}
          disabled={disableSaveButton}
        >
          {workspaceIsNew ? 'Save as...' : 'Save'}
        </SaveButton>
      </Col>
    </Row>
  );
};
SaveWorkspace.propTypes = {
  disableSaveButton: PropTypes.bool.isRequired,
  askSaveWorkspace: PropTypes.func.isRequired,
  workspaceFile: PropTypes.string.isRequired,
  workspaceIsModified: PropTypes.bool.isRequired,
  workspaceIsNew: PropTypes.bool.isRequired,
};

const SaveView = ({ view, askSaveView }) => (
  <Row className="mb5">
    <Col xs={2} />
    <Col className="pl40" xs={7}><ul><li className={styles.bullet}>{view.title}</li></ul></Col>
    <Col xs={3}>
      <SaveButton
        onClick={() => askSaveView(view.uuid)}
        saved={!view.isModified}
      >
        {view.absolutePath || view.oId ? 'Save' : 'Save as...'}
      </SaveButton>
    </Col>
  </Row>
);
SaveView.propTypes = {
  askSaveView: PropTypes.func.isRequired,
  view: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired,
    absolutePath: PropTypes.string,
    oId: PropTypes.string,
  }).isRequired,
};

const SavePage = ({ page, askSavePage, children, boldTitle }) => {
  const title = boldTitle ? <strong>{page.title}</strong> : page.title;
  return (
    <span>
      <Row className="mb5">
        <Col xs={2} />
        <Col xs={7} className="pl20"><ul><li className={styles.bullet}>{title}</li></ul></Col>
        <Col xs={3}>
          <SaveButton
            saved={!page.isModified}
            onClick={() => askSavePage(page.uuid)}
            disabled={_.some(v => !v.absolutePath && !v.oId, page.views)}
          >
            {page.oId || page.absolutePath ? 'Save' : 'Save as...'}
          </SaveButton>
        </Col>
      </Row>
      { children }
    </span>
  );
};
SavePage.propTypes = {
  page: pagePropTypes.isRequired,
  askSavePage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  boldTitle: PropTypes.bool.isRequired,
};

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

const ConfirmationButton = ({ closeModal, disabled, label, value, type }) => (
  <Button
    className="mr10"
    disabled={disabled}
    bsStyle={type}
    onClick={() => closeModal(value)}
  >
    {label}
  </Button>
);
ConfirmationButton.propTypes = {
  closeModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
};
ConfirmationButton.defaultProps = {
  disabled: false,
  value: undefined,
  type: 'primary',
};

const buttonPropTypes = PropTypes.shape({
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
});
export default class SaveWizardModal extends PureComponent {
  static propTypes = {
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
      closeModal, pages, buttons,
      workspaceFile, workspaceIsModified, workspaceIsNew,
      askSaveView, askSavePage, askSaveWorkspace,
    } = this.props;
    const documentsAreModified = _.anyPass([
      _.some('isModified'),
      _.pipe(_.flatMap('views'), _.some('isModified')),
      () => workspaceFile && workspaceIsModified,
    ])(pages);
    return (
      <div>
        <SaveWizard
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
