import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';

const { string } = PropTypes;

export default class EntryPointUnit extends PureComponent {
  static propTypes = {
    convertFrom: string,
    convertTo: string,
  };
  static defaultProps = {
    convertFrom: null,
    convertTo: null,
  };

  render() {
    return (
      <div>
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
