import React, { PureComponent, PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { string, arrayOf, oneOfType, shape } = PropTypes;

export default class ComObjectField extends PureComponent {
  static propTypes = {
    domainName: string,
    timelineId: string,
    catalogName: string,
    itemName: string,
    comObjectName: string,
    // from container
    comObjectFields: oneOfType([
      string,
      arrayOf(shape),
    ]),
  };

  static defaultProps = {
    comObjectFields: null,
    domainName: null,
    timelineId: null,
    catalogName: null,
    itemName: null,
    comObjectName: null,
  };

  render() {
    const { comObjectFields, domainName, timelineId, catalogName, itemName, comObjectName } =
      this.props;
    const disabled = (!domainName || !timelineId || !catalogName || !itemName ||
      !comObjectName || comObjectFields === null);
    return (
      <Field
        format={null}
        name="comObjectField"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(comObjectFields)}
      />
    );
  }
}
