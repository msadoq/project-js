import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, FormControl } from 'react-bootstrap';
import ColorPicker from './ColorPicker.js';
import styles from './SelectFontColor.css';
import select from './Select.css';

/*
  A SUPPRIMER
*/

export default class SelectFontFamilySize extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { curveColor: this.props.curveColor };
  }
  render() {
    return (
      <div>to do</div>
    );
  }
}
