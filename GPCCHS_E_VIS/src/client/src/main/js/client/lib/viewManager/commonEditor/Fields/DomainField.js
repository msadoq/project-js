import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { domainsType } from './types';

const { func } = PropTypes;

export default class DomainField extends PureComponent {
  static propTypes = {
    onChange: func,
    // from container mapStateToProps
    domains: domainsType.isRequired,
  };

  static defaultProps = {
    onChange: null,
  };

  render() {
    return (
      <Field
        format={null}
        name="domain"
        component={ReactSelectField}
        clearable
        options={computeOptions(this.props.domains, true)}
        onChange={this.props.onChange}
      />
    );
  }
}
