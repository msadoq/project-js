import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import styles from './SelectButton.css';
import classNames from 'classnames';

export default class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active, size: this.props.size };
    this.changeActive = this.changeActive.bind(this);
  }
  changeActive(label) {
    this.setState({ active: label });
  }
  render() {
    let buttons = [];
    this.props.buttons.forEach(function(label) {
      buttons.push(<Button
        key={label}
        bsStyle={(this.state.active === label) ? 'primary' : 'default'}
        bsSize="xsmall"
        onClick={() => this.changeActive(label)}
        className={this.state.size === 'xsmall' ? styles.xsmall : null}
      >
        {label}
      </Button>);
    }, this);
    return (
      <ButtonGroup>
        {buttons}
      </ButtonGroup>
    );
  }
}
