import React, { PropTypes } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from 'react-bootstrap';

import styles from './PlotTab.css';
import select from '../Select.css';
import SelectButton from '../Buttons/SelectButton';
import ToggleButton from '../Buttons/ToggleButton';

export default class PlotGrid extends React.Component {
  static propTypes = {
    grids: PropTypes.array.isRequired,
    onShow: PropTypes.func.isRequired,
    onLineStyleChange: PropTypes.func.isRequired,
    onWidthChange: PropTypes.func.isRequired,
    onYAxisChange: PropTypes.func.isRequired
  }

  render() {
    const {
      grids,
      onShow,
      onLineStyleChange,
      onWidthChange,
      onYAxisChange
    } = this.props;

    return (
      <div >
        <Form horizontal>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
              Show
            </Col>
            <Col xs={8}>
              <ToggleButton
                on={'ON'}
                off={'OFF'}
                default={(grids[0].showGrid === true) ? 'ON' : 'OFF'}
                size="xsmall"
                styleOn="primary"
                styleOff="warning"
                onChange={onShow}
              />
            </Col>
          </FormGroup>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
            <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
              Line
            </Col>
            <Col xs={8}>
              <SelectButton
                size="xsmall"
                active={grids[0].lineStyle}
                buttons={[
                  { label: 'Continuous', icon: 'continuous' },
                  { label: 'Dashed', icon: 'dashed' },
                  { label: 'Dotted', icon: 'doted' }
                ]}
                onChange={onLineStyleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
              Y Axis
            </Col>
            <Col xs={8}>
              <FormControl
                value={grids[0].yAxisId}
                onChange={onYAxisChange}
                componentClass="select"
                className={select.xsmall}
              >
                <option value="time">Time</option>
                <option value="frequency">Frequency</option>
                <option value="temperature">Temperature</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
              Width
            </Col>
            <Col xs={8}>
              <FormControl
                type="number"
                className="input-sm"
                value={grids[0].width}
                onChange={onWidthChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
