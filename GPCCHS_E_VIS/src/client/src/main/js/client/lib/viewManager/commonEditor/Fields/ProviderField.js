import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';

const { func, shape, arrayOf, string } = PropTypes;

export default class ProviderField extends PureComponent {
  static propTypes = {
    // own props
    onChange: func,
    // from container mapStateToProps
    providers: arrayOf(shape({ name: string })).isRequired,
  };

  static defaultProps = {
    onChange: null,
  };

  render() {
    return (
      <div>
        <Field
          format={null}
          name="provider"
          component={ReactSelectField}
          clearable
          options={computeOptions(this.props.providers, false)}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
