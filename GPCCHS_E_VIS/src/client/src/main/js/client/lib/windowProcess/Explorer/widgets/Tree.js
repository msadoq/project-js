import React, { PropTypes, PureComponent } from 'react';
import { Treebeard } from 'react-treebeard';
import theme from './TreeTheme';
import createTreeDecorators from './TreeDecorators';


export default class Tree extends PureComponent {

  static propTypes = {
    data: PropTypes.shape({}),
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
