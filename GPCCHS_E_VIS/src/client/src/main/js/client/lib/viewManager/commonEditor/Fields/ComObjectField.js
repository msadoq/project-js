import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class ComObjectField extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    domainName: PropTypes.string,
    timelineId: PropTypes.string,
    catalogName: PropTypes.string,
    itemName: PropTypes.string,
    comObjectName: PropTypes.string,
    // from container
    comObjectFields: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape),
    ]),
  };

  static defaultProps = {
    name: 'connectedData.comObjectField',
    comObjectFields: null,
    domainName: null,
    timelineId: null,
    catalogName: null,
    itemName: null,
    comObjectName: null,
  };

  render() {
    const {
      comObjectFields,
      domainName,
      timelineId,
      catalogName,
      itemName,
      comObjectName,
      name,
    } = this.props;
    const disabled = (!domainName || !timelineId || !catalogName || !itemName ||
      !comObjectName || comObjectFields === null);
    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={name}
          component={ReactSelectField}
          clearable
          disabled={disabled}
          options={computeOptions(comObjectFields)}
        />
      </ErrorBoundary>
    );
  }
}
