import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { PUS_CONSTANTS } from 'constants';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import _getOr from 'lodash/fp/getOr';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { applicationProcessesType } from 'viewManager/common/Components/types';
import './ApplicationProcessField.scss';

export default class ApplicationProcessField extends PureComponent {
  static propTypes = {
    // own props
    onChange: PropTypes.func,
    pusType: PropTypes.string.isRequired,
    // from container mapStateToProps
    applicationProcesses: applicationProcessesType,
    domainId: PropTypes.number,
    sessionId: PropTypes.number,
    // from container mapDispatchToProps
    askApids: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onChange: null,
    applicationProcesses: null,
    applicationProcess: null,
    sessionId: null,
    domainId: null,
  };

  state = {
    apidRawValue: '',
  };

  componentDidMount() {
    this.requestApids(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.requestApids(nextProps);
  }

  requestApids = (props) => {
    const { domainId, sessionId, applicationProcesses, askApids } = props;
    if (domainId !== null && sessionId !== null && applicationProcesses === null) {
      askApids(domainId, sessionId);
    }
  };

  handleChange = (_, newValue) => {
    const apids = filterAPIDs(this.props.applicationProcesses, newValue.split(','));
    this.setState({ apids });
    this.props.onChange(apids, 'connectedData.apids');
  };

  render() {
    const { domainId, sessionId, pusType } = this.props;
    const disabled = domainId === null || sessionId === null;
    const applicationProcessOptions = _map(this.props.applicationProcesses, ap => ({
      name: ap.apidName,
    }));

    return (
      <ErrorBoundary>
        <div className="row mr0 applicationProcess">
          <Field
            format={null}
            name="connectedData.apidName"
            component={ReactSelectField}
            options={computeApplicationProcessOptions(applicationProcessOptions, pusType)}
            className="col-xs-12 pr0"
            onChange={this.handleChange}
            disabled={disabled}
            multi
            closeOnSelect={false}
            simpleValue
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export const filterAPIDs = (applicationProcesses, apidNames) =>
  _filter(applicationProcesses, ap => apidNames.indexOf(ap.apidName) !== -1
);

/**
 * @param list
 * @param pusType
 * @returns {Array}
 */
// eslint-disable-next-line import/prefer-default-export
export const computeApplicationProcessOptions = (list, pusType) => {
  const apids = _getOr([], ['ENABLED_SERVICE_APIDS', pusType], PUS_CONSTANTS);
  if (apids.length === 0) {
    throw new Error(`Invalid configuration detected. No service apids defined for view ${pusType}. Please check sections PUS_CONSTANTS.ENABLED_SERVICE_APIDS`);
  }

  // empty service apid list
  if (!list || !Array.isArray(list)) return [];

  // change each value to generate objects that matches the required structure (react-select)
  return list.map(d =>
    ({
      label: d.name,
      value: d.name,
      disabled: (apids.find(elt => elt === d.name) === undefined),
    })
  );
};
