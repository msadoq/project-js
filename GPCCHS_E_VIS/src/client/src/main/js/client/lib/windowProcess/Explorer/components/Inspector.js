import React, { PureComponent, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import { Treebeard, decorators } from 'react-treebeard';
import getLogger from 'common/log';
import { NODE_TYPE_LINK as LINK } from 'common/constants';
import { Header, Container, Loading } from './TreeDecorators';
import animations from './TreeAnimations';
import theme from './TreeTheme';
import { main } from '../../ipc';

const logger = getLogger('Inspector');


/* theme.tree.node.header.link = {
  textDecoration: 'underline',
};*/
decorators.Container = Container;
decorators.Header = Header;
decorators.Loading = Loading;

const staticHeader = (
  <h2>Static Data</h2>
);
const dynamicHeader = (
  <h2>Dynamic Data</h2>
);

export default class Inspector extends PureComponent {
  static propTypes = {
    sessionId: PropTypes.number.isRequired,
    domainId: PropTypes.number.isRequired,
    data: PropTypes.shape({}),
    toggleNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: 'no data to display',
  };

  onToggle = (node, toggled) => {
    this.props.toggleNode(node.path, toggled);
    if (node.type === LINK) {
      logger.info('Linking to', node.value);
      main.resolveLink({
        link: node.value,
        path: node.path,
        sessionId: this.props.sessionId,
        domainId: this.props.domainId,
      });
    }
  }

  render() {
    logger.debug('render');

    return (
      <div>
        <Panel
          header={staticHeader}
        >
          <Treebeard
            data={this.props.data}
            style={theme}
            onToggle={this.onToggle}
            animations={animations}
            decorators={decorators}
          />
        </Panel>
        <Panel
          header={dynamicHeader}
        />
      </div>
    );
  }
}
