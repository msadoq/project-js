import React, { PureComponent, PropTypes } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { catalogType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { string, arrayOf, oneOfType, func, number } = PropTypes;

export default class CatalogField extends PureComponent {
  static propTypes = {
    timelineId: string,
    // from container mapStateToProps
    catalogs: oneOfType([
      string, // when requesting
      arrayOf(catalogType),
    ]),
    sessionId: number,
    domainId: number,
    // from container mapDispatchToProps
    askCatalogs: func.isRequired,
  };

  static defaultProps = {
    catalogs: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
  };

  componentWillReceiveProps(nextProps) {
    const {
      domainId,
      timelineId,
      sessionId,
      catalogs,
      askCatalogs,
    } = nextProps;

    if (!!(domainId && timelineId) && catalogs === null) {
      askCatalogs(domainId, sessionId);
    }
  }

  render() {
    const { catalogs, domainId, timelineId } = this.props;
    const disabled = (!domainId || !timelineId || catalogs === null);
    return (
      <Field
        format={null}
        name="catalog"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(catalogs)}
      />
    );
  }
}
