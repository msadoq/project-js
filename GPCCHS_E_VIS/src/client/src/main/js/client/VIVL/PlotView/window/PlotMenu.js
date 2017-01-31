import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import {
  Dropdown
} from 'react-bootstrap';

export default class PlotMenu extends PureComponent {
  static propTypes = {
    isOpened: PropTypes.bool,
    openOnLeft: PropTypes.bool,
    openOnTop: PropTypes.bool,
    children: PropTypes.node.isRequired,
    mousePosition: PropTypes.shape({
      X: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
      y: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    }),
  }

  render() {
    const {
      isOpened,
      openOnLeft,
      openOnTop,
      children,
      mousePosition: { x, y },
    } = this.props;

    const menuStyle = {
      position: 'absolute',
      left: x,
      top: y
    };

    return (
      <div
        className={
          classnames('dropdown', {
            open: isOpened,
            dropup: openOnTop
          })}
        style={menuStyle}
      >
        <Dropdown.Menu
          pullRight={openOnLeft}
        >
          {children}
        </Dropdown.Menu>
      </div>
    );
  }
}
