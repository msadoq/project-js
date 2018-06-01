import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';


export default class ComObject extends PureComponent {
  static propTypes = {
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
      !!(domainId && timelineId && catalogName && itemName)
      && comObjects === null
      && catalogItemsLoaded
    ) {
      askComObjects(domainId, sessionId, catalogName, itemName);
    }
  };

  render() {
    const {
      comObjects,
      allowedComObjects,
      domainId,
      timelineId,
      catalogName,
      itemName,
    } = this.props;

    const disabled = (!domainId || !timelineId || !catalogName || !itemName || comObjects === null);
    return (
      <Field
        format={null}
        name="connectedData.comObject"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(allowedComObjects)}
      />
    );
  }
}
