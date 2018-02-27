import React, { PureComponent, PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { string, arrayOf, oneOfType, func, number, shape } = PropTypes;

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
    // from container mapDispatchToProps
    askComObjects: func.isRequired,
  };

  static defaultProps = {
    comObjects: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
    catalogName: null,
    itemName: null,
  };

  componentWillReceiveProps(nextProps) {
    const {
      domainId,
      timelineId,
      sessionId,
      askComObjects,
      catalogName,
      itemName,
      comObjects,
    } = nextProps;

    if (!!(domainId && timelineId && catalogName && itemName) && comObjects === null
    ) {
      askComObjects(domainId, sessionId, catalogName, itemName);
    }
  }

  render() {
    const { comObjects, domainId, timelineId, catalogName, itemName } = this.props;
    const disabled = (!domainId || !timelineId || !catalogName || !itemName || comObjects === null);
    return (
      <Field
        format={null}
        name="comObject"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(comObjects)}
      />
    );
  }
}
