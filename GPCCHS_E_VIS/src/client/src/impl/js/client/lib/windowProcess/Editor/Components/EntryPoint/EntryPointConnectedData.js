import React, { PropTypes } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import Select from 'react-select';
import styles from './EntryPointDetails.css';
import select from '../Select.css';

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
  state = {}

  componentWillMount() {
    const { connectedData } = this.props;

    this.setState({
      axisID: connectedData.axisId,
      unitValue: connectedData.unit,
      formatValue: connectedData.format,
      axesValue: connectedData.axisId
    });
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
  handleDomain = e => this.props.handleChange('domain', e.target.value);
  handleSession = e => this.props.handleChange('session', e.target.value);
  handleName = e => this.props.handleChange('fullName', e.target.value);

  render() {
    const { connectedData } = this.props;
    const {
      format,
      type,
      axesValue
   } = this.state;

    return (
      <Form horizontal>
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalConnData">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Conn.data
          </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              value={connectedData.fullName}
              className="input-sm"
              onChange={this.handleName}
              placeholder="no value"
            />
          </Col>
        </FormGroup>
        <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
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
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalFormat">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
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
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalDigits">
            <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
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
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalDomain">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Domain
          </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              className="input-sm"
              value={connectedData.domain}
              onChange={this.handleDomain}
              placeholder="no value"
            />
          </Col>
        </FormGroup>
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalUrl">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Session
          </Col>
          <Col xs={9}>
            <FormControl
              type="text"
              className="input-sm"
              value={connectedData.session}
              onChange={this.handleSession}
              placeholder="no value"
            />
          </Col>
        </FormGroup>
        {(type === 'FDS') ?
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalUrl">
            <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
              Url
            </Col>
            <Col xs={9}>
              <FormControl type="text" className="input-sm" />
            </Col>
          </FormGroup>
         : null
        }
        {(type === 'FDS') ?
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalVersion">
            <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
              Version
            </Col>
            <Col xs={9}>
              <FormControl type="text" className="input-sm" />
            </Col>
          </FormGroup>
        : null
        }
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalFormat">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
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
        <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Filter
          </Col>
          <Col xs={5}>
            <FormControl componentClass="select" className={select.xsmall}>
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
            <FormControl componentClass="select" className={select.xsmall}>
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
