import React, { PropTypes } from 'react';
import _omit from 'lodash/omit';

const s = {
  overlay: {
    height: '100%',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#FFF68F',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  text: {
    zIndex: 2,
    fontSize: '3em',
    width: '75%',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
};

export default class DroppableContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onDrop: PropTypes.func,
    text: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      over: false
    };
  }

  onDragOver(e) {
    e.preventDefault();

    if (!this.state.over) {
      this.setState({
        over: true
      });
    }
  }

  onDragLeave() {
    if (this.state.over) {
      this.setState({
        over: false
      });
    }
  }

  render() {
    const otherProps = _omit(this.props, [
      'children',
      'onDrop',
      'text',
    ]);

    return (
      <div
        style={{
          height: '100%',
          position: 'relative',
          width: '100%',
        }}
        onDragOver={this.onDragOver.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDrop={this.props.onDrop.bind(this)}
        {...otherProps}
      >
        {this.props.children}
        <div
          style={this.state.over ? s.overlay : { display: 'none' }}
        >
          <div style={s.text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}
