import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class ComObject extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    timelineId: PropTypes.string,
    // from container mapStateToProps
    comObjects: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape()),
    ]),
    allowedComObjects: PropTypes.arrayOf(PropTypes.shape()),
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
    catalogName: PropTypes.string,
    itemName: PropTypes.string,
    catalogItemsLoaded: PropTypes.bool,
    // from container mapDispatchToProps
    askComObjects: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: 'connectedData.comObject',
    comObjects: null,
    allowedComObjects: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
    catalogName: null,
    catalogItemsLoaded: false,
    itemName: null,
  };

  componentWillMount() {
    this.tryToLoadComObjects(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.tryToLoadComObjects(nextProps);
  }

  tryToLoadComObjects = (props) => {
    const {
      domainId,
      timelineId,
      sessionId,
      askComObjects,
      catalogName,
      itemName,
      comObjects,
      catalogItemsLoaded,
    } = props;

    if (
      Number.isInteger(domainId) &&
      (timelineId !== null && timelineId.length > 0) &&
      (catalogName !== null && catalogName.length > 0) &&
      (itemName !== null && itemName.length > 0) &&
      comObjects === null &&
      catalogItemsLoaded
    ) {
      askComObjects(domainId, sessionId, catalogName, itemName);
    }
  };

  render() {
    const {
      name,
      comObjects,
      allowedComObjects,
      domainId,
      timelineId,
      catalogName,
      itemName,
    } = this.props;

    const disabled = (!domainId || !timelineId || !catalogName || !itemName || comObjects === null);
    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={name}
          component={ReactSelectField}
          clearable
          disabled={disabled}
          options={computeOptions(allowedComObjects)}
        />
      </ErrorBoundary>
    );
  }
}
