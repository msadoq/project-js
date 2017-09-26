// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : add context menu on links in inspector
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
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
    onMouseDown: () => {},
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
      />
    );
  }

}
