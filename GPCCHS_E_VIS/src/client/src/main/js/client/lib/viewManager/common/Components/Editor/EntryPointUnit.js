import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import styles from './EntryPointUnit.css';

const { string } = PropTypes;

export default class EntryPointUnit extends PureComponent {
  static propTypes = {
    convertFrom: string,
    convertTo: string,
    unit: string,
  };
  static defaultProps = {
    convertFrom: null,
    convertTo: null,
    unit: <i>Unknown</i>,
  };

  render() {
    return (
      <div>
        <HorizontalFormGroup label="Default unit">
          <div
            className={styles.plaintTextPadded}
          >
            {this.props.unit}
          </div>
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Convert from">
          <Field
            format={null}
            name="convertFrom"
            type="text"
            className="form-control input-sm"
            component={InputField}
            value={this.props.convertFrom}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Convert to">
          <Field
            format={null}
            name="convertTo"
            type="text"
            className="form-control input-sm"
            component={InputField}
            value={this.props.convertTo}
          />
        </HorizontalFormGroup>
      </div>
    );
  }
}
