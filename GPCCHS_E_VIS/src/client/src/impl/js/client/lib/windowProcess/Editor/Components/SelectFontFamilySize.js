import React, { PropTypes } from 'react';
import { Col, FormControl, InputGroup } from 'react-bootstrap';
import styles from './SelectFontFamilySize.css';
import select from './Select.css';

const { Addon } = InputGroup;

/*
  SelectFontFamilysize permet de selectionner une police et une taille de caracteres.
  Le composant attend une propriété "update" qui est une fonction à 2 parametres.
*/
export default class SelectFontFamilySize extends React.Component {
  static propTypes = {
    update: PropTypes.func.isRequired,
    font: PropTypes.string,
    size: PropTypes.number
  }

  handleFontFamily = e => this.props.update('font', e.target.value);
  handleSize = e => this.props.update('size', e.target.value);

  render() {
    const { font, size } = this.props;

    return (
      <div className="row">
        <Col xs={6}>
          <FormControl
            componentClass="select"
            className={select.xsmall}
            onChange={this.handleFontFamily}
            value={font}
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
              value={size}
            >
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
            </FormControl>
            <Addon className={styles.addon}>px</Addon>
          </InputGroup>
        </Col>
      </div>
    );
  }
}
