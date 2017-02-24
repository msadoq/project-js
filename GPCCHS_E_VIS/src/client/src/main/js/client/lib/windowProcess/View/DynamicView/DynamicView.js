import React, { PropTypes, PureComponent } from 'react';
import { Table, Form, FormGroup, Grid, Row, Col, ControlLabel, FormControl, Panel } from 'react-bootstrap';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _lowerCase from 'lodash/lowerCase';
import moment from 'moment';
import styles from './DynamicView.css';

const pattern = /^([^.]+)\.([^<]+)<([^>]+)>(\.){0,1}([\w]+){0,1}$/i;

function dataToShow(data) {
  if (data.value === undefined) {
    return '';
  }
  if (data.type === 'time') {
    return moment(data.value).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS');
  } else if (data.type === 'boolean') {
    return data.value ? 'true' : 'false';
  } else if (data.type === 'enum') {
    return data.symbol;
  }
  return data.value;
}

function objectHeader(ep) {
  const objectKeys = Object.keys(ep).filter(key => !_isArray(ep[key]));

  const staticHeader = [];
  objectKeys.forEach((key, idx) => {
    staticHeader.push(
      <FormGroup controlId="formHorizontal" key={'group'.concat(idx)}>
        <Col componentClass={ControlLabel} sm={3}>
          <strong>{_lowerCase(key)}</strong>
        </Col>
        <Col sm={8}>
          <FormControl
            type="text"
            value={dataToShow(ep[key])}
            placeholder="Enter text"
            disabled
          />
        </Col>
      </FormGroup>
    );
  });

  return <Form horizontal>{staticHeader}</Form>;
}

function arrayHeader(arrayData) {
  if (!arrayData.length) {
    return <thead />;
  }
  return (
    <thead>
      <tr key="header">
        {Object.keys(arrayData[0]).map((value, idx) =>
          <th
            key={'head'.concat(idx)}
            className="text-center"
          >
            {_lowerCase(value)}
          </th>
        )}
      </tr>
    </thead>
  );
}

function arrayLine(arrayData) {
  if (!arrayData.length) {
    return '';
  }
  const header = Object.keys(arrayData[0]);
  const item = 'item';
  return arrayData.map((value, idx) =>
    (<tr key={item.concat(idx)}>{header.map((key, idy) => <td key={item.concat(idy)}>
      {dataToShow(value[key])}</td>)}</tr>));
}


export default class DynamicView extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      values: PropTypes.object,
      index: PropTypes.object,
    }),
    entryPoints: PropTypes.objectOf(PropTypes.object),
    formula: PropTypes.string,
  };

  static defaultProps = {
    formula: 0,
    entryPoints: {},
  };

  parseFormula() {
    const { formula } = this.props;
    if (typeof formula !== 'string' || !pattern.test(formula)) {
      return 'No connected data';
    }

    const matches = formula.match(pattern);
    return matches[2] ? matches[2] : 'Invalid connected data';
  }

  render() {
    const { data, entryPoints } = this.props;
    const ep = _get(data, ['values', 'dynamicEP', 'value']);
    if (!ep) {
      return (
        <div className="flex">
          <div className={styles.renderErrorText}>
            Unable to render view <br />
            {entryPoints[0].error}
          </div>
        </div>
      );
    }

    return (
      <div>
        <header className={styles.header}>
          <h1>{this.parseFormula()}</h1>
        </header>
        <Grid fluid className="ml10 mr10">
          <Row><Panel>{objectHeader(ep)}</Panel></Row>
          <Row>
            <Col sm={12}>
              <Table striped bordered condensed hover>
                {arrayHeader(ep.decommutedValues)}
                <tbody>
                  {arrayLine(ep.decommutedValues)}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
