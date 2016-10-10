import React from 'react';
import { Col } from 'react-bootstrap';
import ToggleButton from './Buttons/ToggleButton.js';

/*
  SelectFontStyle permet d'éditer les propriétés de styles :
    - Gras
    - Italique
    - Souligner
    - Surligner
  Le composant attend une propriété "update" qui est une fonction à 2 parametres.
*/
export default class SelectFontStyle extends React.Component {
  static propTypes = {
    update: React.PropTypes.func.isRequired,
    bold: React.PropTypes.bool,
    italic: React.PropTypes.bool,
    underline: React.PropTypes.bool,
    strikeOut: React.PropTypes.bool,
  }
  constructor(...args) {
    super(...args);
    this.state = { name: '' };
    this.handleBold = this.handleBold.bind(this);
    this.handleItalic = this.handleItalic.bind(this);
    this.handleUnderline = this.handleUnderline.bind(this);
    this.handleStrikeOut = this.handleStrikeOut.bind(this);
  }
  handleBold(state) {
    this.props.update('bold', state === 'ON');
  }
  handleItalic(state) {
    this.props.update('italic', state === 'ON');
  }
  handleUnderline(state) {
    this.props.update('unederline', state === 'ON');
  }
  handleStrikeOut(state) {
    this.props.update('strikeOut', state === 'ON');
  }
  render() {
    return (
      <div className="row">
        <Col xs={3}>
          <ToggleButton
            on="B"
            off="B"
            default={(this.props.bold ? 'ON' : 'OFF')}
            size="xsmall"
            styleOn="primary"
            styleOff="default"
            onChange={this.handleBold}
          />
        </Col>
        <Col xs={3}>
          <ToggleButton
            on="I"
            off="I"
            default={(this.props.italic ? 'ON' : 'OFF')}
            size="xsmall"
            styleOn="primary"
            styleOff="default"
            onChange={this.handleItalic}
          />
        </Col>
        <Col xs={3}>
          <ToggleButton
            on={"U"}
            off={"U"}
            default={(this.props.underline ? 'ON' : 'OFF')}
            size="xsmall"
            styleOn="primary"
            styleOff="default"
            onChange={this.handleUnderline}
          />
        </Col>
        <Col xs={3}>
          <ToggleButton
            on={"S"}
            off={"S"}
            default={(this.props.strikeOut ? 'ON' : 'OFF')}
            size="xsmall"
            styleOn="primary"
            styleOff="default"
            onChange={this.handleStrikeOut}
          />
        </Col>
      </div>
    );
  }
}
