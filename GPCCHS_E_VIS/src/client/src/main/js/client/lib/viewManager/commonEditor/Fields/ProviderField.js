import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { func, shape, arrayOf, string } = PropTypes;

export default class ProviderField extends PureComponent {
  static propTypes = {
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
          component="select"
          className="form-control"
          onChange={this.props.onChange}
        >
          {
            computeOptions(this.props.providers, true)
            .map(provider =>
              <option key={provider.value} value={provider.value}>{provider.label}</option>
            )
          }
        </Field>
      </div>
    );
  }
}
