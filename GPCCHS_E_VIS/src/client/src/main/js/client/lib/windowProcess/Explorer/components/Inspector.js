import React, { PureComponent, PropTypes } from 'react';
import { Treebeard, decorators, theme } from 'react-treebeard';
import getLogger from 'common/log';
import { Header, Container } from './TreeDecorators';
import animations from './TreeAnimations';

const logger = getLogger('Inspector');


theme.tree.node.header.link = {
  textDecoration: 'underline',
};
decorators.Container = Container;
decorators.Header = Header;

export default class Inspector extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({}),
    toggleNode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: 'no data to display',
  };

  onToggle = (node, toggled) => {
    this.props.toggleNode(node.path, toggled);
    if (node.type === 'link') {
      logger.info('Linking to', node.value);
    }
  }

  render() {
    logger.debug('render');

    return (
      <Treebeard
        data={this.props.data}
        onToggle={this.onToggle}
        animations={animations}
        decorators={decorators}
      />
    );
  }
}
