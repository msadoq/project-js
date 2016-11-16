import React, { PropTypes } from 'react';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel
} from 'react-bootstrap';
import SelectButton from '../Buttons/SelectButton';
import styles from './EntryPointDetails.css';
import ColorPicker from '../ColorPicker';

const LineStyles = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' }
];

const PointsStyles = [
  { label: 'None', icon: 'none' },
  { label: 'Triangle', icon: 'triangle' },
  { label: 'Square', icon: 'square' },
  { label: 'Dot', icon: 'dot' }
];

export default class EntryPointStyle extends React.Component {
  static propTypes = {
    entryPoint: PropTypes.object.isRequired,
    handleCurveColour: PropTypes.func.isRequired,
    handleLineStyle: PropTypes.func.isRequired,
    handlePoints: PropTypes.func.isRequired,
  }

  render() {
    const {
      entryPoint,
      handleCurveColour,
      handleLineStyle,
      handlePoints
    } = this.props;

    return (
      <div>
        <Form horizontal>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
            <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
              Line
            </Col>
            <Col xs={9}>
              <SelectButton
                size="xsmall"
                active={entryPoint.lineStyle}
                buttons={LineStyles}
                iconOnly="true"
                onChange={handleLineStyle}
              />
            </Col>
          </FormGroup>
          <FormGroup
            className={styles.formGroupXsmall}
            controlId="formHorizontalTimeline"
          >
            <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
              Points
            </Col>
            <Col xs={9}>
              <SelectButton
                size="xsmall"
                active={entryPoint.pointsStyle}
                buttons={PointsStyles}
                onChange={handlePoints}
              />
            </Col>
          </FormGroup>
          <FormGroup
            className={styles.formGroupXsmall}
            controlId="formHorizontalTimeline"
          >
            <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
              Color
            </Col>
            <Col xs={9}>
              <ColorPicker
                color={entryPoint.curveColour}
                onChange={handleCurveColour}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
