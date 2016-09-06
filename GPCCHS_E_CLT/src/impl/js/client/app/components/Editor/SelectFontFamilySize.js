import React from 'react';
import { Col, FormControl, InputGroup } from 'react-bootstrap';
import styles from './SelectFontFamilySize.css';
import select from './Select.css';

/*
  SelectFontFamilysize permet de selectionner une police et une taille de caracteres.
  Le composant attend une propriété "update" qui est une fonction à 2 parametres.
*/
export default class SelectFontFamilySize extends React.Component {
  static propTypes = {
    update: React.PropTypes.func.isRequired
  }
  constructor(...args) {
    super(...args);
    this.state = { name: '' };
    this.handleFontFamily = this.handleFontFamily.bind(this);
    this.handleSize = this.handleSize.bind(this);
  }
  handleFontFamily(e) {
    this.props.update('font', e.target.value);
  }
  handleSize(e) {
    this.props.update('size', e.target.value);
  }
  render() {
    return (
      <div className="row">
        <Col xs={6}>
          <FormControl
            componentClass="select"
            className={select.xsmall}
            onChange={this.handleFontFamily}
          >
            <option value="arial">Arial</option>
            <option value="tahoma">Tahoma</option>
          </FormControl>
        </Col>
        <Col xs={6}>
          <InputGroup>
            <FormControl
              componentClass="select"
              className={select.xsmall}
              onChange={this.handleSize}
            >
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
            </FormControl>
            <InputGroup.Addon className={styles.addon}>px</InputGroup.Addon>
          </InputGroup>
        </Col>
      </div>
    );
  }
}
