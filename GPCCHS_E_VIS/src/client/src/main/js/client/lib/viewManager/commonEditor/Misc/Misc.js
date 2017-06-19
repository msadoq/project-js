import React, { PropTypes } from 'react';
import Collapse from 'rc-collapse';
import { Button, Glyphicon } from 'react-bootstrap';
import LinksContainer from './LinksContainer';


const { Panel } = Collapse;

export default class Misc extends React.Component {
  static propTypes = {
    updateViewPanels: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
  };
  static defaultProps = {
    links: [],
  }
  static contextTypes = {
    windowId: PropTypes.string,
  };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  }

  handleAddLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { openModal, viewId } = this.props;
    const { windowId } = this.context;
    openModal(windowId, { type: 'addLink', viewId, myFormKey: 'addLink', id: 'addLink' });
  }

  render() {
    const { viewId, panels } = this.props;
    const keys = ['Links'];

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={keys}
      >
        <Panel
          key="links"
          header={
            <div className="rc-collapse-header-inner">
              <span className="flex" style={{ paddingLeft: '13px' }}>Links</span>
              <Button
                bsSize="xsmall"
                className="pull-right btn-link"
                onClick={this.handleAddLink}
              >
                <Glyphicon
                  className="text-success"
                  glyph="plus"
                  title="Add"
                />
              </Button>
            </div>
          }
        >
          {
            panels.links &&
            <LinksContainer
              viewId={viewId}
              panel="links"
            />
          }
        </Panel>
      </Collapse>
    );
  }
}
