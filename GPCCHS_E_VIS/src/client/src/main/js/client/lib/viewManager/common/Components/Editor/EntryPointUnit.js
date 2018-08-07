import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import parameters from 'common/configurationManager';
import styles from './EntryPointUnit.css';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';

const unitParameters = Object.values(parameters.get('UNITS'));

const computeOptions = (param, fil) => {
  const paramFilter = param.filter(d => d.includes(fil));
  if (paramFilter[0]) {
    return paramFilter[0].map(d => ({ label: d, value: d }));
  }
  return [];
};

export default class EntryPointUnit extends PureComponent {
  static propTypes = { // FIXME: is this really needed ?
    convertFrom: PropTypes.string,
    convertTo: PropTypes.string,
    unit: PropTypes.string,
    askUnit: PropTypes.func.isRequired,
    domainId: PropTypes.number,
    sessionId: PropTypes.number,
    catalog: PropTypes.string,
    catalogItem: PropTypes.string,
  };
  static defaultProps = {
    convertFrom: null,
    convertTo: null,
    unit: 'Unknown',
    domainId: null,
    sessionId: null,
    catalog: null,
    catalogItem: null,
  };
  componentWillReceiveProps(nextProps) {
    const {
      askUnit,
      domainId,
      sessionId,
      catalog,
      catalogItem,
    } = nextProps;

    if (
      domainId !== null &&
      sessionId !== null &&
      catalog !== null &&
      catalogItem !== null
    ) {
      askUnit(domainId, sessionId, catalog, catalogItem);
    }
  }


  render() {
    const { unit } = this.props;
    return (
      <ErrorBoundary>
        <HorizontalFormGroup label="Default unit">
          <div
            className={styles.plaintTextPadded}
          >
            {unit}
          </div>
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Convert from">
          <Field
            name="connectedData.convertFrom"
            clearable={false}
            component={ReactSelectField}
            options={computeOptions(unitParameters, unit)}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Convert to">
          <Field
            name="connectedData.convertTo"
            clearable={false}
            component={ReactSelectField}
            options={computeOptions(unitParameters, unit)}
          />
        </HorizontalFormGroup>
      </ErrorBoundary>
    );
  }
}
