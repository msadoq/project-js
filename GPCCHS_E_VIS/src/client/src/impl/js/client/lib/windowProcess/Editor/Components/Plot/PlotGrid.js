import React, { PropTypes } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from 'react-bootstrap';

import SelectButton from '../Buttons/SelectButton';
import ToggleButton from '../Buttons/ToggleButton';

export default class PlotGrid extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    grid: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleWidth = e => this.props.onChange(this.props.index, 'width', e.target.value);
  handleShow = state => this.props.onChange(this.props.index, 'showGrid', state === 'ON');
  handleLineStyle = val => this.props.onChange(this.props.index, 'lineStyle', val);
  handleYAxis = e => this.props.onChange(this.props.index, 'yAxisId', e.target.value);

  render() {
    const {
      grid
    } = this.props;

    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} xs={4} >
            Show
          </Col>
          <Col xs={8} >
            <ToggleButton
              on={'ON'}
              off={'OFF'}
              default={(grid.showGrid === true) ? 'ON' : 'OFF'}
              size="xsmall"
              styleOn="primary"
              styleOff="warning"
              onChange={this.handleShow}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalCurve">
          <Col componentClass={ControlLabel} xs={4} >
            Line
          </Col>
          <Col xs={8}>
            <SelectButton
              size="xsmall"
              active={grid.lineStyle}
              buttons={[
                { label: 'Continuous', icon: 'continuous' },
                { label: 'Dashed', icon: 'dashed' },
                { label: 'Dotted', icon: 'doted' }
              ]}
              onChange={this.handleLineStyle}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} xs={4} >
            Y Axis
          </Col>
          <Col xs={8}>
            <FormControl
              className="input-sm"
              value={grid.yAxisId}
              onChange={this.handleYAxis}
              componentClass="select"
            >
              <option value="time">Time</option>
              <option value="frequency">Frequency</option>
              <option value="temperature">Temperature</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} xs={4} >
            Width
          </Col>
          <Col xs={8}>
            <FormControl
              type="number"
              className="input-sm"
              value={grid.width}
              onChange={this.handleWidth}
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
