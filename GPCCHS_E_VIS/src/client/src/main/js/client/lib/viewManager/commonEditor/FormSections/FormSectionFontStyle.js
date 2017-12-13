// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// END-HISTORY
// ====================================================================

import React from 'react';
import { Field, FormSection } from 'redux-form';
import {
  InputGroup,
  Col,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import ColorPickerField from 'windowProcess/commonReduxForm/ColorPickerField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import SelectButtonField from 'windowProcess/commonReduxForm/SelectButtonField';
import SelectFontField from '../Fields/SelectFontField';

const { Addon } = InputGroup;

export default class FormSectionFontStyle extends FormSection {
  static defaultProps = {
    font: 'Arial',
    size: 12,
    bold: false,
    italic: false,
    underline: false,
    strikeOut: false,
    align: 'left',
    color: '#000000',
    bgColor: '#dfdfdf',
  }

  render() {
    const alignButtons = [
      { label: 'left', icon: 'alignLeft' },
      { label: 'center', icon: 'alignCenter' },
      { label: 'right', icon: 'alignRight' },
    ];
    return (
      <div>
        <HorizontalFormGroup label="Font">
          <div className="row">
            <Col xs={6}>
              <Field
                name="font"
                component={SelectFontField}
                className="form-control input-sm"
                type="text"
              />
            </Col>
            <Col xs={6}>
              <InputGroup>
                <Field
                  name="size"
                  component={InputField}
                  normalize={value => parseInt(value, 10)}
                  className="form-control input-sm"
                  type="number"
                />
                <Addon>px</Addon>
              </InputGroup>
            </Col>
          </div>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Align">
          <Field
            component={SelectButtonField}
            name="align"
            buttons={alignButtons}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Style">
          <Field
            name="bold"
            component={ButtonToggleField}
            textOn="B"
            textOff="B"
          />
          <Field
            name="italic"
            component={ButtonToggleField}
            textOn="I"
            textOff="I"
          />
          <Field
            name="underline"
            component={ButtonToggleField}
            textOn="U"
            textOff="U"
          />
          <Field
            name="strikeOut"
            component={ButtonToggleField}
            textOn="S"
            textOff="S"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="color"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Bg Color">
          <Field
            name="bgColor"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>
      </div>
    );
  }
}
