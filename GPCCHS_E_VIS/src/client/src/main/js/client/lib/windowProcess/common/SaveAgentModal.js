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

const SaveAgent = ({ pages, askSavePage, askSaveView }) => (
  <div className="mt20 mb20" >
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
};

export default class SaveAgentModal extends PureComponent {
  static propTypes = {
    askSavePage: PropTypes.func.isRequired,
    askSaveView: PropTypes.func.isRequired,
    pages: pagesPropTypes.isRequired,
    closeModal: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['close', 'save']).isRequired,
  }

  static defaultProps = {
    buttons: [],
  }

  render() {
    const { closeModal, pages, askSaveView, askSavePage, mode } = this.props;
    const documentsAreModified = _.anyPass([
      _.some('isModified'),
      _.pipe(_.flatMap('views'), _.some('isModified')),
    ])(pages);
    return (
      <div>
        <SaveAgent
          pages={pages}
          askSaveView={askSaveView}
          askSavePage={askSavePage}
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
