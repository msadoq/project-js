/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import TimelineFieldContainer from 'viewManager/commonEditor/Fields/TimelineFieldContainer';
import CatalogFieldContainer from 'viewManager/commonEditor/Fields/CatalogFieldContainer';
import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';
import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';
import ComObjectFieldContainer from 'viewManager/commonEditor/Fields/ComObjectFieldContainer';
import ProviderFieldContainer from 'viewManager/commonEditor/Fields/ProviderFieldContainer';
import
  DataTypeField, {
    SDB_VALUE_OPTION,
    TIME_BASED_DATA_OPTION,
  } from 'viewManager/commonEditor/Fields/DataTypeField';
import RefTimestampFieldContainer from 'viewManager/commonEditor/Fields/RefTimestampFieldContainer';
import PathField from 'viewManager/commonEditor/Fields/PathField';
import DisplayModeField from 'viewManager/commonEditor/Fields/DisplayModeField';
import './EntryPointTree.css';
import { reduxFormFieldsType } from '../types';

const { string } = PropTypes;

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class EntryPointConnectedDataFields extends PureComponent {
  static propTypes = {
    // own props
    viewId: string.isRequired,
    pageId: string.isRequired,
    ...reduxFormFieldsType,
    // from container mapStateToProps
    selectedDomainName: string,
    selectedTimelineId: string,
    selectedCatalogName: string,
    selectedItemName: string,
    selectedComObjectName: string,
  };

  static defaultProps = {
    selectedDomainName: null,
    selectedTimelineId: null,
    selectedCatalogName: null,
    selectedItemName: null,
    selectedComObjectName: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  state = {
    dataType: this.props.dataType,
  };

  render() {
    const { windowId } = this.context;
    const {
      viewId,
      pageId,
      selectedDomainName,
      selectedTimelineId,
      selectedCatalogName,
      selectedItemName,
      selectedComObjectName,
      dataType,
    } = this.props;

    const classForSdbValues = classnames(dataType === TIME_BASED_DATA_OPTION.value && 'hidden');
    const classForTimeBasedValues = classnames(dataType === SDB_VALUE_OPTION.value && 'hidden');

    return (
      <React.Fragment>
        <HorizontalFormGroup label="Domain">
          <DomainFieldContainer
            name="connectedData.domain"
            domainName={selectedDomainName}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <TimelineFieldContainer
            name="connectedData.timeline"
            windowId={windowId}
            timelineName={selectedTimelineId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Catalog">
          <CatalogFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Data type">
          <DataTypeField />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Path" className={classForSdbValues}>
          <PathField />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Display mode" className={classForSdbValues}>
          <DisplayModeField />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Catalog item" className={classForTimeBasedValues}>
          <CatalogItemFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            catalogName={selectedCatalogName}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Com object" className={classForTimeBasedValues}>
          <ComObjectContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            catalogName={selectedCatalogName}
            itemName={selectedItemName}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Ref. timestamp" className={classForTimeBasedValues}>
          <RefTimestampFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            catalogName={selectedCatalogName}
            itemName={selectedItemName}
            comObjectName={selectedComObjectName} // FIXME: are all those fields required ?
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Com object Field" className={classForTimeBasedValues}>
          <ComObjectFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            catalogName={selectedCatalogName}
            itemName={selectedItemName}
            comObjectName={selectedComObjectName}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Provider" className={classForTimeBasedValues}>
          <ProviderFieldContainer />
        </HorizontalFormGroup>
      </React.Fragment>
    );
  }
}
