// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';
import { Button } from 'react-bootstrap';
import None from './icons/none';
import styles from './ColorPicker.css';
import { colors as initialColors } from '../common/colors';

export default class ColorPicker extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
    width: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    width: 276,
    colors: initialColors,
  }

  state = { display: false, color: this.props.color || '#FFF' };

  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      this.setState({
        color: nextProps.color,
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ display: !this.state.display });
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex, display: false });
    this.props.onChange(this.state.color);
  }
  render() {
    const { color } = this.state;
    const { width, colors } = this.props;
    const buttonStyle = { backgroundColor: color };
    return (
      <div className={styles.root}>
        <Button
          style={buttonStyle}
          bsSize="xsmall"
          onClick={this.handleClick}
        ><None /></Button>
        {
          this.state.display &&
          <div className={styles.popover}>
            <TwitterPicker
              onChangeComplete={this.handleChangeComplete}
              color={color}
              colors={colors}
              width={width}
            />
          </div>
        }
      </div>
    );
  }
}
