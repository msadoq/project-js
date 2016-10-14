import React from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import Continuous from '../icons/continuous';
import Dashed from '../icons/dashed';
import Doted from '../icons/doted';
import Square from '../icons/square';
import Dot from '../icons/dot';
import Triangle from '../icons/triangle';
import None from '../icons/none';
import styles from './SelectButton.css';

export default class SelectButton extends React.Component {
  static propTypes = {
    size: React.PropTypes.string,
    active: React.PropTypes.string,
    buttons: React.PropTypes.Array,
    onChange: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      size: this.props.size,
      nbElem: this.props.buttons.length
    };
    this.changeActive = this.changeActive.bind(this);
  }
  changeActive(e, label) {
    this.setState({ active: label });
    e.target.blur();
    this.props.onChange(label);
  }
  render() {
    const buttons = [];
    this.props.buttons.forEach((button) => {
      buttons.push(<Button
        key={button.label}
        bsStyle={(this.state.active === button.label) ? 'primary' : 'default'}
        bsSize="xsmall"
        onClick={e => this.changeActive(e, button.label)}
        className={this.state.size === 'xsmall' ? styles.xsmall : null}
      >
        {(button.icon === 'continuous') ? <Continuous /> : null}
        {(button.icon === 'dashed') ? <Dashed /> : null}
        {(button.icon === 'doted') ? <Doted /> : null}
        {(button.icon === 'square') ? <Square /> : null}
        {(button.icon === 'dot') ? <Dot /> : null}
        {(button.icon === 'triangle') ? <Triangle /> : null}
        {(button.icon === 'none') ? <None /> : null}
        {(button.icon === 'alignLeft') ? <Glyphicon glyph="align-left" /> : null}
        {(button.icon === 'alignCenter') ? <Glyphicon glyph="align-center" /> : null}
        {(button.icon === 'alignRight') ? <Glyphicon glyph="align-right" /> : null}
      </Button>);
    });
    return (
      <ButtonGroup className={styles.group}>
        {buttons}
      </ButtonGroup>
    );
  }
}
