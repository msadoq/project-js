import React, { PureComponent, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import getLogger from 'common/log';
import {
  NODE_TYPE_LINK as LINK,
  NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK,
} from 'common/constants';
import Tree from './Tree';
import { main } from '../../ipc';

const logger = getLogger('Inspector');


const staticHeader = (
  <h2>Static Data</h2>
);
const dynamicHeader = (
  <h2>Dynamic Data</h2>
);

export default class Inspector extends PureComponent {
  static propTypes = {
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
    data: PropTypes.shape({}),
    toggleNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
    sessionId: null,
    domainId: null,
  };

  state = {
    showContextMenu: false,
    node: null,
    x: null,
    y: null,
  };

  onMouseDown = (event, node) => {
    if (event.buttons === 1) {
      this.props.toggleNode(node.path, !node.toggled);
      if (node.type === LINK) {
        logger.info('Linking to', node.value);
        main.resolveLink({
          link: node.value,
          path: node.path,
          sessionId: this.props.sessionId,
          domainId: this.props.domainId,
        });
      }
      return;
    }
    if (event.buttons === 2) {
      if (node.type === LINK || node.type === RESOLVED_LINK) {
        const x = event.clientX;
        const y = event.clientY;
        this.setState({
          showContextMenu: true,
          node,
          x,
          y,
        });
      }
    }
  }

  hideMenu = () => {
    if (this.state.showContextMenu === false) {
      return;
    }
    this.setState({
      showContextMenu: false,
    });
  }

  render() {
    logger.debug('render');
    const { data, sessionId, domainId } = this.props;
    const { showContextMenu, node, x, y } = this.state;
    const contextStyle = {
      zIndex: 4,
      position: 'absolute',
      left: x,
      top: y,
    };

    return (
      <div
        onClick={this.hideMenu}
      >
        <Panel
          header={staticHeader}
        >
          {
            showContextMenu &&
            <Button
              style={contextStyle}
              onClick={() => main.resolveLink({
                link: node.value,
                path: node.path,
                sessionId,
                domainId,
              })}
            >
              Resolve link through RTD
            </Button>
          }
          <Tree
            data={data}
            onMouseDown={this.onMouseDown}
          />
        </Panel>
        <Panel
          header={dynamicHeader}
        />
      </div>
    );
  }
}
