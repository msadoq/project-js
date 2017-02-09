import React, { PropTypes, PureComponent } from 'react';
import _omit from 'lodash/omit';
import noop from 'lodash/noop';
import getLogger from 'common/log';
import Console from 'common/utils/console';

const logger = getLogger('drag and drop');

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

export default class DroppableContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onDrop: PropTypes.func,
    text: PropTypes.string,
  }

  static defaultProps = {
    text: 'Drop here',
    onDrop: noop,
  }

  constructor(props) {
    super(props);
    this.state = {
      over: false,
    };
  }

  onDragOver = this.dragOver.bind(this);
  onDragLeave = this.dragLeave.bind(this);
  onDrop = this.drop.bind(this);

  dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.over) {
      this.setState({
        over: true,
      });
    }
  }

  dragLeave() {
    if (this.state.over) {
      this.setState({
        over: false,
      });
    }
  }

  drop(e) {
    try {
      this.props.onDrop(e);
    } catch (err) {
      Console.error(err);
      logger.info('unable to parse dropped data');
    } finally {
      this.setState({
        over: false,
      });
      e.preventDefault();
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
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
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
