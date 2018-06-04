/* eslint-disable no-param-reassign */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : add context menu on links in inspector
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific
//  TM data
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Treebeard } from 'react-treebeard';
import theme from './TreeTheme';
import createTreeDecorators from './TreeDecorators';


export default class Tree extends PureComponent {

  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.shape({})]),
    onMouseDown: PropTypes.func,
  };

  static defaultProps = {
    data: null,
    onMouseDown: () => {
    },
    onToggle: () => {
    },
  };

  state = {};

  onToggle = (node, toggled) => {
    console.log(this.state.cursor);
    // eslint-disable-next-line no-param-reassign
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    if (this.state.cursor) {
      this.setState({ cursor: { active: false } });
    } else {
      this.setState({ cursor: node });
    }
  }

  decorators = createTreeDecorators(this.props.onMouseDown);

  render() {
    if (!this.props.data) {
      return undefined;
    }
    return (
      <Treebeard
        data={this.props.data}
        style={theme}
        animations={false}
        decorators={this.decorators}
        onToggle={this.onToggle}
      />
    );
  }

}
