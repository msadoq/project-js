import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Glyphicon,
} from 'react-bootstrap';

const activeButtonIcon = 'floppy-saved';
const inactiveButtonIcon = 'floppy-remove';

export default class SaveVisualizationToggle extends PureComponent {

  static propTypes = {
    buttonClassName: PropTypes.string,
    liClassName: PropTypes.string,
    glyphIconClassName: PropTypes.string,
    isActive: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    buttonClassName: null,
    liClassName: null,
    glyphIconClassName: null,
    isActive: false,
  };

  render() {
    const { liClassName, glyphIconClassName, isActive, handleClick } = this.props;
    const buttonClassName = classnames(this.props.buttonClassName, isActive ? 'active' : null);
    const icon = isActive ? activeButtonIcon : inactiveButtonIcon;

    return (
      <li className={liClassName}>
        <button
          className={buttonClassName}
          onClick={handleClick}
          title="Save visualization window in workspace"
        >
          <Glyphicon className={glyphIconClassName} glyph={icon} />
        </button>
      </li>
    );
  }
}
