import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash/fp';
import { Button, Label, Glyphicon, Row, Col } from 'react-bootstrap';
import styles from './SaveAgentModal.css';

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

const SavePage = ({ page, askSavePage, children }) => (
  <span>
    <Row className="mb5">
      <Col xs={2} />
      <Col xs={7} className="pl20"><ul><li className={styles.bullet}>{page.title}</li></ul></Col>
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
SavePage.propTypes = {
  page: pagePropTypes.isRequired,
  askSavePage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SaveAgent = ({
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
        <SavePage key={page.uuid} askSavePage={askSavePage} page={page}>
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
SaveAgent.propTypes = {
  pages: PropTypes.arrayOf(pagePropTypes).isRequired,
  askSavePage: PropTypes.func.isRequired,
  askSaveView: PropTypes.func.isRequired,
  askSaveWorkspace: PropTypes.func.isRequired,
  workspaceFile: PropTypes.string.isRequired,
  workspaceIsModified: PropTypes.bool.isRequired,
  workspaceIsNew: PropTypes.bool.isRequired,
};

export default class SaveAgentModal extends PureComponent {
  static propTypes = {
    workspaceFile: PropTypes.string,
    workspaceIsModified: PropTypes.bool.isRequired,
    workspaceIsNew: PropTypes.bool.isRequired,
    documentType: PropTypes.string.isRequired,
    askSaveView: PropTypes.func.isRequired,
    askSavePage: PropTypes.func.isRequired,
    askSaveWorkspace: PropTypes.func.isRequired,
    pages: PropTypes.arrayOf(pagePropTypes).isRequired,
    closeModal: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['close', 'save']).isRequired,
  }

  static defaultProps = {
    workspaceFile: '',
    buttons: [],
  }

  render() {
    const {
      closeModal, pages, mode, workspaceFile, workspaceIsModified, workspaceIsNew,
      askSaveView, askSavePage, askSaveWorkspace, documentType,
    } = this.props;
    const documentsAreModified = _.anyPass([
      _.some('isModified'),
      _.pipe(_.flatMap('views'), _.some('isModified')),
    ])(pages);
    return (
      <div>
        <SaveAgent
          workspaceFile={workspaceFile}
          workspaceIsModified={workspaceIsModified}
          workspaceIsNew={workspaceIsNew}
          pages={pages}
          askSaveView={askSaveView}
          askSavePage={askSavePage}
          askSaveWorkspace={askSaveWorkspace}
        />
        <div className="text-center">
          { mode === 'save' &&
            <Button disabled={documentsAreModified}>
              Ok
            </Button>
          }
          { mode === 'close' &&
            <Button
              bsStyle={documentsAreModified ? 'danger' : 'primary'}
              onClick={() => closeModal('close')}
            >
              {documentsAreModified ? `Close ${documentType} without saving` : `Close ${documentType}`}
            </Button>
          }
        </div>
      </div>
    );
  }
}
