// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint eslint disable no console . . .
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Revert "Replace some console uses by new Console"
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Replace some console uses by new Console
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Revert "[FT:#5316] Lint eslint disable no console .
//  . ."
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 2.0.0 : FA : #8192 : 20/10/2017 : Possibility to drop a page on an empty workspace.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
import _omit from 'lodash/omit';
import noop from 'lodash/noop';
import getLogger from 'common/logManager';

const logger = getLogger('drag and drop');

const s = {
  displayNone: {
    display: 'none',
  },
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
      console.error(err); // eslint-disable-line no-console
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
        className="h100 w100 posRelative"
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        {...otherProps}
      >
        {this.props.children}
        <div
          style={this.state.over ? s.overlay : s.displayNone}
        >
          <div style={s.text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}
