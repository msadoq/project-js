import React, { Component, PropTypes } from 'react';

export default class GridBlock extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };
  render() {
    var divStyle = {
      backgroundColor: 'white',
      border: '2px solid grey',
      overflow: 'auto',
    };
    return (
      <div key={viewId} style={divStyle}>
        {this.props.children}
      </div>
    );
  }
}
