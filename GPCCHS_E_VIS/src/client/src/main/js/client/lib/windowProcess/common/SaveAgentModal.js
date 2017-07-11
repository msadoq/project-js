import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash/fp';
import { Button, Label, Glyphicon } from 'react-bootstrap';

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
      bsStyle="primary"
      bsSize="xsmall"
      className="ml10"
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
  <div className="mt20 mb20" >
    {workspaceFile && <div className="mt10">
      {workspaceFile}
      <SaveButton
        saved={!workspaceIsModified}
        onClick={() => askSaveWorkspace()}
        disabled={_.some(p => !p.absolutePath && !p.oId, pages)}
      >
        {workspaceIsNew ? 'Save as...' : 'Save'}
      </SaveButton>
    </div>}
    {
      pages.map(page => (
        <div key={page.uuid} className="mt10">
          {page.title}
          <SaveButton
            saved={!page.isModified}
            onClick={() => askSavePage(page.uuid)}
            disabled={_.some(v => !v.absolutePath && !v.oId, page.views)}
          >
            {page.oId || page.absolutePath ? 'Save' : 'Save as...'}
          </SaveButton>
          <div className="">
            {
              page.views.map(view => (
                <div key={view.uuid} className="mt5">
                  {view.title}
                  <SaveButton
                    onClick={() => askSaveView(view.uuid)}
                    saved={!view.isModified}
                  >
                    {view.absolutePath ? 'Save' : 'Save as...'}
                  </SaveButton>
                </div>
              ))
            }
          </div>
        </div>
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
      askSaveView, askSavePage, askSaveWorkspace,
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
            {documentsAreModified ? 'Close page without saving' : 'Close page'}
          </Button>
        }
      </div>
    );
  }
}
