import React, { PureComponent, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import getLogger from 'common/log';
import {
  NODE_TYPE_LINK as LINK,
  NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK,
} from 'common/constants';
import Tree from './Tree';
import { main } from '../../ipc';
import handleContextMenu from '../../common/handleContextMenu';

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

  onMouseDown = (event, node) => {
    const { sessionId, domainId } = this.props;
    if (event.buttons === 1) {
      this.props.toggleNode(node.path, !node.toggled);
      if (node.type === LINK) {
        logger.info('Linking to', node.value);
        main.resolveLink({
          link: node.value,
          path: node.path,
          sessionId,
          domainId,
        });
      }
      return;
    }
    if (event.buttons === 2) {
      if (node.type === LINK || node.type === RESOLVED_LINK) {
        const workspace = {
          label: 'Resolve link through RTD',
          click: () => main.resolveLink({
            link: node.value,
            path: node.path,
            sessionId,
            domainId,
          }),
        };
        handleContextMenu(workspace);
      }
    }
  }

  render() {
    logger.debug('render');
    const { data } = this.props;

    return (
      <div>
        <Panel
          header={staticHeader}
        >
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
