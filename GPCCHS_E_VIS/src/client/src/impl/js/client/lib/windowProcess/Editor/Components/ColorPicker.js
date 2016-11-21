import React, { PropTypes } from 'react';
import { TwitterPicker } from 'react-color';
import { Button } from 'react-bootstrap';
import None from './icons/none';
import styles from './ColorPicker.css';

const colors = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
  '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
  '#795548', '#607d8b'
];

export default class ColorPicker extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func
  }
  state = { display: false, color: this.props.color || '#FFF' };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ display: !this.state.display });
  }

  handleClose = () => {
    this.setState({
      display: false
    });
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
    this.props.onChange(this.state.color);
  }
  render() {
    const { color } = this.state;

    return (
      <div className={styles.root}>
        <Button
          style={{ backgroundColor: color }}
          iconOnly="true"
          bsSize="xsmall"
          onClick={this.handleClick}
        ><None /></Button>
        {this.state.display &&
          <div className={styles.popover}>
            <div className={styles.cover} onClick={this.handleClose} />
            <TwitterPicker
              onChangeComplete={this.handleChangeComplete}
              color={color}
              colors={colors}
            />
          </div>}
      </div>
    );
  }
}
