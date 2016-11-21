import React, { PropTypes } from 'react';
import { FormControl, Col, Row } from 'react-bootstrap';

export default class FilterData extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterOptions: PropTypes.node.isRequired
  };

  state = {
    filter: 'monitoringState',
    operator: 'inf',
    value: 10
  };

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
    this.props.onChange(e.target.value, this.state.operator, this.state.value);
  }

  handleOperator = (e) => {
    this.setState({ operator: e.target.value });
    this.props.onChange(this.state.filter, e.target.value, this.state.value);
  }

  handleValue = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(this.state.filter, this.state.operator, e.target.value);
  }

  render() {
    const { filterOptions } = this.props;

    return (
      <Row>
        <Col xs={6} style={ColStyle1}>
          <FormControl
            componentClass="select"
            onChange={this.handleFilter}
          >
            {filterOptions}
          </FormControl>
        </Col>
        <Col xs={3} style={ColStyle2}>
          <FormControl
            componentClass="select"
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
            onChange={this.handleValue}
          />
        </Col>
      </Row>
    );
  }
}

let ColStyle1 = {
  paddingLeft: '10px',
  paddingRight: '4px'
};

let ColStyle2 = {
  paddingLeft: '4px',
  paddingRight: '4px'
};

let ColStyle3 = {
  paddingLeft: '4px',
  paddingRight: '10px'
};
