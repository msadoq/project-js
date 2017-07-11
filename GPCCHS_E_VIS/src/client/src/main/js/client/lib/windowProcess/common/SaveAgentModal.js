import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash/fp';
import { Button, Label, Glyphicon, Row, Col } from 'react-bootstrap';
import styles from './SaveAgentModal.css';

const pagesPropTypes = PropTypes.arrayOf(PropTypes.shape({
  title: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isModified: PropTypes.bool,
  views: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    isModified: PropTypes.bool,
  })).isRequired,
}));

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

const SaveAgent = ({
  askSavePage, askSaveView, askSaveWorkspace,
  pages, workspaceFile, workspaceIsModified, workspaceIsNew,
}) => (
  <div>
    {workspaceFile && <Row className="mb5">
      <Col xs={2} />
      <Col xs={7}>
        <ul><li className={styles.bullet}><strong>{workspaceFile}</strong></li></ul>
      </Col>
      <Col className="" xs={3}>
        <SaveButton
          saved={!workspaceIsModified}
          onClick={() => askSaveWorkspace()}
          disabled={_.some(p => !p.absolutePath && !p.oId, pages)}
        >
          {workspaceIsNew ? 'Save as...' : 'Save'}
        </SaveButton>
      </Col>
    </Row>}
    {
      pages.map(page => (
        <span>
          <Row className="mb5" key={page.uuid}>
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
          {
            page.views.map(view => (
              <Row className="mb5" key={view.uuid}>
                <Col xs={2} />
                <Col className="pl40" xs={7}><ul><li className={styles.bullet}>{view.title}</li></ul></Col>
                <Col xs={3}>
                  <SaveButton
                    onClick={() => askSaveView(view.uuid)}
                    saved={!view.isModified}
                  >
                    {view.absolutePath ? 'Save' : 'Save as...'}
                  </SaveButton>
                </Col>
              </Row>
            ))
          }
        </span>
      ))
    }
  </div>
);
SaveAgent.propTypes = {
  pages: pagesPropTypes.isRequired,
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
    pages: pagesPropTypes.isRequired,
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
              bsStyle={documentsAreModified ? 'warning' : 'primary'}
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
