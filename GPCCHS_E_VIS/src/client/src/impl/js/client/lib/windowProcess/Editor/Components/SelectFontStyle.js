import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ToggleButton from './Buttons/ToggleButton';

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
    update: PropTypes.func.isRequired,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
    strikeOut: PropTypes.bool,
  }
  state = { name: '' };

  handleBold = state => this.props.update('bold', state === 'ON');
  handleItalic = state => this.props.update('italic', state === 'ON');
  handleUnderline = state => this.props.update('unederline', state === 'ON');
  handleStrikeOut = state => this.props.update('strikeOut', state === 'ON');

  render() {
    const {
      bold,
      italic,
      underline,
      strikeOut
    } = this.props;
    return (
      <div className="row">
        <Col xs={3}>
          <ToggleButton
            on="B"
            off="B"
            default={(bold ? 'ON' : 'OFF')}
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
            default={(italic ? 'ON' : 'OFF')}
            size="xsmall"
            styleOn="primary"
            styleOff="default"
            onChange={this.handleItalic}
          />
        </Col>
        <Col xs={3}>
          <ToggleButton
            on={'U'}
            off={'U'}
            default={(underline ? 'ON' : 'OFF')}
            size="xsmall"
            styleOn="primary"
            styleOff="default"
            onChange={this.handleUnderline}
          />
        </Col>
        <Col xs={3}>
          <ToggleButton
            on={'S'}
            off={'S'}
            default={(strikeOut ? 'ON' : 'OFF')}
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
