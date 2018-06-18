import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import styles from './EntryPointUnit.css';


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
            name="connectedData.convertFrom"
            type="text"
            className="form-control input-sm"
            component={InputField}
            value={this.props.convertFrom}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Convert to">
          <Field
            format={null}
            name="connectedData.convertTo"
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
