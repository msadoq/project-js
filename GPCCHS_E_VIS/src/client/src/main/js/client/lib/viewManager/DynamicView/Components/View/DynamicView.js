import React, { PropTypes, PureComponent } from 'react';
import { Table, Form, FormGroup, Grid, Row, Col, ControlLabel, Panel, MenuItem } from 'react-bootstrap';
import classnames from 'classnames';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _lowerCase from 'lodash/lowerCase';
import _isObject from 'lodash/isObject';
import moment from 'moment';
import styles from './DynamicView.css';

function convertData(data) {
  if (data.type === 'time') {
    return moment(data.value).format('YYYY-MM-DD HH[:]mm[:]ss[.]SSS');
  } else if (data.type === 'boolean') {
    return data.value ? 'true' : 'false';
  } else if (data.type === 'enum') {
    return data.symbol;
  }
  return data.value;
}
function dataToShow(data) {
  if (data.value === undefined || _isObject(data.value)) {
    if (_isObject(data)) {
      const keys = Object.keys(data);
      return (<dl
        className={classnames(
          'dl-horizontal',
          'margin: 0 0 4px 0',
          'display: inline-flex',
          'padding: 20px'
        )}
      >
        {keys.map((k) => {
          if (data[k].value) {
            return ([<dt>{k}</dt>,
              <dd>{data[k].value}</dd>]);
          }
          return ([<dt>{k}</dt>,
            <dd>
              { Object.keys(data[k]).map((val, key) => {
                if (data[k][val].value) {
                  return (<li key={'li'.concat(key)}><b>{val}:</b> {convertData(data[k][val])}</li>);
                }
                return ([<dt>{val}</dt>,
                  <dd>{dataToShow(data[k][val])}</dd>]);
              })}
            </dd>]);
        }
        )}
      </dl>);
    }
    return '';
  }
  return convertData(data);
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
          <Panel className={styles.panel}>{dataToShow(ep[key])}</Panel>
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
    pageId: PropTypes.string.isRequired,
    openInspector: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formula: 0,
    entryPoints: {},
  };

  state = {
    showContext: false,
    x: null,
    y: null,
  }


  onContextMenu = (event) => {
    const x = event.clientX - this.el.getBoundingClientRect().left;
    const y = event.clientY - this.el.getBoundingClientRect().top;
    this.setState({
      showContext: true,
      x,
      y,
    });
  }

  assignEl = (el) => { this.el = el; };

  hideMenu = (event) => {
    if (event.buttons === 2 || this.state.showContext === false) {
      return;
    }
    this.setState({
      showContext: false,
    });
  }

  renderContextMenu = () => {
    const { entryPoints, pageId, openInspector } = this.props;
    const { x, y } = this.state;
    const contextStyle = {
      display: 'block',
      zIndex: 4,
      position: 'absolute',
      left: x,
      top: y,
    };

    const { parameterName, sessionId, domainId } = entryPoints.dynamicEP.dataId;
    return (
      <ul className="dropdown-menu open" style={contextStyle} id="dynamicViewContextMenu">
        <MenuItem
          onSelect={() => openInspector({
            pageId,
            parameterName,
            sessionId,
            domainId,
          })}
          eventKey="inspector"
        >
          Open in Inspector
        </MenuItem>
      </ul>
    );
  }

  render() {
    const { data, entryPoints } = this.props;
    const ep = _get(data, ['values', 'dynamicEP', 'value']);
    const error = _get(entryPoints, '[0].error');
    if (!ep) {
      return (
        <div className="flex">
          <div className={styles.renderErrorText}>
            Unable to render view <br />
            {error}
          </div>
        </div>
      );
    }

    const { parameterName } = entryPoints.dynamicEP.dataId;
    const arrayKeys = Object.keys(ep).filter(key => _isArray(ep[key]));
    return (
      <div
        ref={this.assignEl}
        onContextMenu={this.onContextMenu}
        onClick={this.hideMenu}
      >
        {
          this.state.showContext &&
          this.renderContextMenu()
        }
        <header className={styles.header}>
          <h1>{parameterName}</h1>
        </header>
        <Grid fluid className="ml10 mr10">
          <Row><Panel>{objectHeader(ep)}</Panel></Row>
          { arrayKeys.map((key, i) => (
            <Row key={'row'.concat(i)}>
              <header className={styles.arrayHeader}><h2>{_lowerCase(key)}</h2></header>
              <Col sm={12}>
                <Table striped bordered condensed hover>
                  {arrayHeader(ep[key])}
                  <tbody>
                    {arrayLine(ep[key])}
                  </tbody>
                </Table>
              </Col>
            </Row>))}
        </Grid>
      </div>
    );
  }
}
