import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';

import styles from '../Explorer.css';
import ToggleButton from '../../common/ToggleButton';

export default class DetailButtons extends PureComponent {
  static propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      flag: PropTypes.bool.isRequired,
    })),
  };
  static defaultProps = {
    buttons: [],
  }

  render() {
    const buttons = [];
    this.props.buttons.forEach((button, idx) => {
      buttons.push((<ToggleButton
        on={button.label}
        off={button.label}
        default={(button.flag ? 'ON' : 'OFF')}
        size="small"
        styleOn="primary"
        styleOff="default"
        onChange={button.onChange}
        className={classnames(
          'btn-sm',
          styles.button)}
        key={'button'.concat(idx)}
      />));
    });
    return (
      <div className={classnames('row', styles.buttons)} >
        {buttons}
      </div>
    );
  }
}
