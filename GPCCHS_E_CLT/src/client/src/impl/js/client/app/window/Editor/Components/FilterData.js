import React from 'react';
import { FormControl, Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import select from './Select.css';
import styles from './EntryPointDetails.css';

export default class FilterData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'monitoringState',
      operator: 'inf',
      value: 10
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }
  handleFilter(e) {
    this.setState({ filter: e.target.value });
    this.props.onChange(this.state.filter + this.state.operator + this.state.value);
  }
  handleOperator(e) {
    this.setState({ operator: e.target.value });
    this.props.onChange(this.state.filter + this.state.operator + this.state.value);
  }
  handleValue(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(this.state.filter + this.state.operator + this.state.value);
  }
  render() {
    return (
      <Row>
        <Col xs={6} style={ColStyle1}>
          <FormControl
            componentClass="select"
            className={classNames(select.xsmall)}
            onChange={this.handleFilter}
          >
            {this.props.filterOptions}
          </FormControl>
        </Col>
        <Col xs={3} style={ColStyle2}>
          <FormControl
            componentClass="select"
            className={classNames(select.xsmall)}
            onChange={this.handleOperator}
          >
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
        <Col xs={3} style={ColStyle3}>
          <FormControl
            type="text"
            className={classNames(styles.input_xsmall)}
            onChange={this.handleValue}
          />
        </Col>
      </Row>
    );
  }
}

let ColStyle1 = { 
  "paddingLeft": "10px",
  "paddingRight": "4px"
}

let ColStyle2 = { 
  "paddingLeft": "4px",
  "paddingRight": "4px"
}

let ColStyle3 = { 
  "paddingLeft": "4px",
  "paddingRight": "10px"
}