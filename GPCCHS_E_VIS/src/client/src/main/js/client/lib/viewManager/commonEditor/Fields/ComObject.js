import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { bool, string, arrayOf, oneOfType, func, number, shape } = PropTypes;

export default class ComObject extends PureComponent {
  static propTypes = {
    timelineId: string,
    // from container mapStateToProps
    comObjects: oneOfType([
      string,
      arrayOf(shape),
    ]),
    sessionId: number,
    domainId: number,
    catalogName: string,
    itemName: string,
    catalogItemsLoaded: bool,
    // from container mapDispatchToProps
    askComObjects: func.isRequired,
  };

  static defaultProps = {
    comObjects: null,
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
      && (comObjects === null || comObjects.length === 0)
      && catalogItemsLoaded
    ) {
      askComObjects(domainId, sessionId, catalogName, itemName);
    }
  };

  render() {
    const { comObjects, domainId, timelineId, catalogName, itemName } = this.props;
    const disabled = (!domainId || !timelineId || !catalogName || !itemName || comObjects === null);
    return (
      <Field
        format={null}
        name="connectedData.comObject"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(comObjects)}
      />
    );
  }
}
