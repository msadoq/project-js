import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from 'react-bootstrap';

import styles from './PlotTab.css';
import ColorPicker from '../ColorPicker';
import SelectButton from '../Buttons/SelectButton';
import SelectFontFamilySize from '../SelectFontFamilySize';
import SelectFontStyle from '../SelectFontStyle';

export default class PlotTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    onTitleStyleChange: PropTypes.func.isRequired,
    onAlignChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      title,
      titleStyle,
      onTitleStyleChange,
      onAlignChange
    } = this.props;

    return (
      <div className={classnames(styles.shift, styles.mt5)}>
        <Form horizontal>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
              Title
            </Col>
            <Col xs={8}>
              <FormControl
                type="text"
                className={styles.input_xsmall}
                value={title}
                onChange={this.handleTitle}
              />
            </Col>
          </FormGroup>
          <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
              Font
            </Col>
            <Col xs={8}>
              <SelectFontFamilySize update={onTitleStyleChange} />
            </Col>
          </FormGroup>
          <FormGroup
            className={styles.formGroupXsmall}
            controlId="formControlsSelect"
          >
            <Col className={styles.formLabel} componentClass={ControlLabel} xs={4}>
              Style
            </Col>
            <Col xs={8}>
              <SelectFontStyle
                update={onTitleStyleChange}
                bold={titleStyle.bold}
                italic={titleStyle.italic}
                underline={titleStyle.underline}
                strikeout={titleStyle.strikeOut}
              />
            </Col>
          </FormGroup>
          <FormGroup
            className={styles.formGroupXsmall}
            controlId="formControlsSelect"
          >
            <Col className={styles.formLabel} componentClass={ControlLabel} xs={4}>
              Color
            </Col>
            <Col xs={8}>
              <ColorPicker color="#F5A623" onChange={onTitleStyleChange} />
            </Col>
          </FormGroup>
          <FormGroup
            className={styles.formGroupXsmall}
            controlId="formControlsSelect"
          >
            <Col className={styles.formLabel} componentClass={ControlLabel} xs={4}>
              Align
            </Col>
            <Col xs={8}>
              <SelectButton
                size="xsmall"
                active={titleStyle.align}
                buttons={[
                  { label: 'left', icon: 'alignLeft' },
                  { label: 'center', icon: 'alignCenter' },
                  { label: 'right', icon: 'alignRight' }
                ]}
                onChange={onAlignChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
