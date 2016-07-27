import React from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import classNames from 'classnames';
import SelectButton from '../Buttons/SelectButton';
import styles from './EntryPointDetails.css';
import select from './Select.css';

export default class EntryPointConnectedData extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      fullName: this.props.connectedData.fullName,
      unit: this.props.connectedData.unit,
      digit: this.props.connectedData.digit,
      format: this.props.connectedData.format,
      domain: this.props.connectedData.domain,
      session: this.props.connectedData.session,
      axisID: this.props.connectedData.axisId
    };
  }
  update(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <Form horizontal>
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalConnData">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Conn.data
          </Col>
          <Col xs={9}>
            <FormControl type="text" value={this.state.fullName} className={styles.input_xsmall} onChange={this.update} />
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
            <FormControl type="text" className={styles.input_xsmall}/>
          </Col>
        </FormGroup>
        <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Unit
          </Col>
          <Col xs={9}>
            <FormControl componentClass="select" className={select.xsmall}>
              <option value="ns">ns</option>
              <option value="us">us</option>
              <option value="ms">ms</option>
              <option value="s">s</option>
              <option value="min">min</option>
              <option value="h">h</option>
              <option value="day">day</option>
              <option value="year">year</option>
              <option value="century">century</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalFormat">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Timeline
          </Col>
          <Col xs={9}>
            <SelectButton buttons={['decimal', 'hexadecimal', 'binary']} />
          </Col>
        </FormGroup>
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalUrl">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Url
          </Col>
          <Col xs={9}>
            <FormControl type="text" className={styles.input_xsmall} />
          </Col>
        </FormGroup>
        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalVersion">
          <Col className={styles.formLabel} componentClass={ControlLabel} xs={3}>
            Version
          </Col>
          <Col xs={9}>
            <FormControl type="text" className={styles.input_xsmall} />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
