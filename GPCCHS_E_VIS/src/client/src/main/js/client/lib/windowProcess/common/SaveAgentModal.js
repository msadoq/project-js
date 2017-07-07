import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash/fp';
import { Button, Label, Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';

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

const SaveAgent = ({ pages, askSavePage, askSaveView }) => (
  <div className="mt20 mb20" >
    {
      pages.map(page => (
        <div key={page.uuid} className="mt10">
          {page.title}
          <SaveButton
            saved={!page.isModified}
            onClick={() => askSavePage(page.uuid)}
            disabled={_.some('isModified', page.views)}
          >
            {page.oId || page.absolutePath ? 'Save' : 'Save as...'}
          </SaveButton>
          <div className="">
            {
              page.views.map(view => (
                <div key={view.uuid} className="mt5">
                  {view.title}
                  {view.isModified && <Button
                    onClick={() => askSaveView(view.uuid)}
                    bsStyle="primary"
                    bsSize="xsmall"
                  >
                    {view.absolutePath ? 'Save' : 'Save as...'}
                  </Button>}
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
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }).isRequired),
    closeModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    buttons: [],
  }

  render() {
    const { buttons, closeModal, pages, askSaveView, askSavePage } = this.props;
    return (
      <div>
        <SaveAgent
          pages={pages}
          askSaveView={askSaveView}
          askSavePage={askSavePage}
        />
        <div>
          {
            buttons.map(({ label, value }) => (
              <button
                key={label + value}
                className={classnames('btn', 'btn-primary', 'mr5')}
                onClick={() => closeModal(value)}
              >
                {label}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}
