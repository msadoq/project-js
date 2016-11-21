import React, { PropTypes } from 'react';
import {
  Form, FormGroup, FormControl,
  Col, ControlLabel, InputGroup,
  Button, Glyphicon
} from 'react-bootstrap';
import Select from 'react-select';

export const unitOptions = [
  { value: 'ns', label: 'ns' },
  { value: 'us', label: 'us' },
  { value: 'ms', label: 'ms' },
  { value: 's', label: 's' },
  { value: 'min', label: 'min' },
  { value: 'h', label: 'h' },
  { value: 'day', label: 'day' },
  { value: 'year', label: 'year' },
  { value: 'century', label: 'century' },
  { value: 'V', label: 'V' }
];

export const formatOptions = [
  { value: 'decimal', label: 'decimal' },
  { value: 'hexadecimal', label: 'hexadecimal' },
  { value: 'binary', label: 'binary' }
];

export const axesOptions = [
  { value: 'time', label: 'time' },
  { value: 'frequency', label: 'frequency' },
  { value: 'temperature', label: 'temperature' }
];

/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
export default class EntryPointConnectedData extends React.Component {
  static propTypes = {
    connectedData: PropTypes.object,
    handleChange: PropTypes.func
  }
  state = {
    axisID: this.props.connectedData.axisId,
    unitValue: this.props.connectedData.unit,
    formatValue: this.props.connectedData.format,
    axesValue: this.props.connectedData.axisId,
    formula: this.props.connectedData.formula,
    domain: this.props.connectedData.domain,
    timeline: this.props.connectedData.timeline
  }

  /*
    Toutes les fonctions dont le nom commence par handle sont appelées
    par la modification d'une valeur dans un formulaire.
    @TODO : Ces fonctions doivent vérifier la conformiter de la nouvelle valeur
            et appeler une fonction passée en props pour mettre à jour cette valeur
            dans le noeud racine.
    L'utilisation de setState est temporaire, pour voir la mise à jour dans l'IHM.
  */
  handleUnit = val => this.props.handleChange('unit', val.value);
  handleFormat = val => this.props.handleChange('format', val.value);
  handleAxes = val => this.setState({ axesValue: val.value });
  handleDigits = e => this.props.handleChange('digits', e.target.value);
  handleDomain = e => this.setState({ domain: e.target.value });
  validateDomain = () => this.props.handleChange('domain', this.state.domain);
  handleTimeline = e => this.setState({ timeline: e.target.value });
  validateTimeline = () => this.props.handleChange('timeline', this.state.timeline);
  handleFormula = e => this.setState({ formula: e.target.value });
  validateFormula = () => this.props.handleChange('formula', this.state.formula);

  render() {
    const { connectedData } = this.props;
    const {
      format,
      type,
      axesValue,
      formula,
      domain,
      timeline
   } = this.state;

    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalConnData">
          <Col componentClass={ControlLabel} xs={3}>
            Formula
          </Col>
          <Col xs={9}>
            <InputGroup>
              <FormControl
                type="text"
                value={formula}
                className="input-sm"
                onChange={this.handleFormula}
                placeholder="no value"
              />
              <InputGroup.Button>
                <Button
                  onClick={this.validateFormula}
                  bsSize="small"
                >
                  <Glyphicon glyph="ok" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} xs={3}>
            Unit
          </Col>
          <Col xs={9}>
            <Select
              name="form-field-unit"
              clearable={false}
              options={unitOptions}
              onChange={this.handleUnit}
              className="has-value"
              value={connectedData.unit}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalFormat">
          <Col componentClass={ControlLabel} xs={3}>
            Format
          </Col>
          <Col xs={9}>
            <Select
              name="form-field-format"
              clearable={false}
              value={connectedData.format}
              options={formatOptions}
              onChange={this.handleFormat}
              className="has-value"
            />
          </Col>
        </FormGroup>
        {(format === 'decimal') ?
          <FormGroup controlId="formHorizontalDigits">
            <Col componentClass={ControlLabel} xs={3} >
              Digits
            </Col>
            <Col xs={9}>
              <FormControl
                type="number"
                className="input-sm"
                value={connectedData.digits}
                onChange={this.handleDigits}
              />
            </Col>
          </FormGroup>
          : null
        }
        <FormGroup controlId="formHorizontalDomain">
          <Col componentClass={ControlLabel} xs={3}>
            Domain
          </Col>
          <Col xs={9}>
            <InputGroup>
              <FormControl
                type="text"
                value={domain}
                className="input-sm"
                onChange={this.handleDomain}
                placeholder="no value"
              />
              <InputGroup.Button>
                <Button
                  onClick={this.validateDomain}
                  bsSize="small"
                >
                  <Glyphicon glyph="ok" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalUrl">
          <Col componentClass={ControlLabel} xs={3}>
            Session
          </Col>
          <Col xs={9}>
            <InputGroup>
              <FormControl
                type="text"
                value={timeline}
                className="input-sm"
                onChange={this.handleTimeline}
                placeholder="no value"
              />
              <InputGroup.Button>
                <Button
                  onClick={this.validateTimeline}
                  bsSize="small"
                >
                  <Glyphicon glyph="ok" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </FormGroup>
        {(type === 'FDS') ?
          <FormGroup controlId="formHorizontalUrl">
            <Col componentClass={ControlLabel} xs={3}>
              Url
            </Col>
            <Col xs={9}>
              <FormControl type="text" className="input-sm" />
            </Col>
          </FormGroup>
         : null
        }
        {(type === 'FDS') ?
          <FormGroup controlId="formHorizontalVersion">
            <Col componentClass={ControlLabel} xs={3}>
              Version
            </Col>
            <Col xs={9}>
              <FormControl type="text" className="input-sm" />
            </Col>
          </FormGroup>
        : null
        }
        <FormGroup controlId="formHorizontalFormat">
          <Col componentClass={ControlLabel} xs={3}>
            Axis
          </Col>
          <Col xs={9}>
            <Select
              name="form-field-axes"
              clearable={false}
              value={axesValue}
              options={axesOptions}
              onChange={this.handleAxes}
              className="has-value"
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} xs={3}>
            Filter
          </Col>
          <Col xs={5}>
            <FormControl componentClass="select" >
              <option value="noFilter">No Filter</option>
              <option value="convertedValue">Converted value</option>
              <option value="extractedValue">Extracted value</option>
              <option value="groundDate">Ground date</option>
              <option value="isNominal">Is nominal</option>
              <option value="isObsolete">Is obsolete</option>
              <option value="monitoringState">Monitoring state</option>
              <option value="onBoardDate">Onboard date</option>
              <option value="rawValue">Row value</option>
              <option value="triggerOffCounter">Trigger off counter</option>
              <option value="triggerOnCounter">Trigger on counter</option>
              <option value="validityState">Validity state</option>
            </FormControl>
          </Col>
          <Col xs={2}>
            <FormControl componentClass="select" >
              <option value="equals"> = </option>
              <option value="notEquals"> &ne; </option>
              <option value="inf"> &lt; </option>
              <option value="infOrEq"> &le; </option>
              <option value="sup"> &gt; </option>
              <option value="supOrEq"> &ge; </option>
              <option value="contains"> CONTAINS </option>
              <option value="notContains"> !CONTAINS </option>
            </FormControl>
          </Col>
          <Col xs={2}>
            <FormControl type="text" className="input-sm" />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
