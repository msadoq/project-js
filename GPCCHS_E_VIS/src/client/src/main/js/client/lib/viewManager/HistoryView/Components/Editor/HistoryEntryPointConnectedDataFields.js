import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import TimelineFieldContainer from 'viewManager/commonEditor/Fields/TimelineFieldContainer';
import CatalogFieldContainer from 'viewManager/commonEditor/Fields/CatalogFieldContainer';
import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';
import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';
import ProviderFieldContainer from 'viewManager/commonEditor/Fields/ProviderFieldContainer';
import DataTypeField from 'viewManager/commonEditor/Fields/DataTypeField';
import PathField from 'viewManager/commonEditor/Fields/PathField';
import DisplayModeField from 'viewManager/commonEditor/Fields/DisplayModeField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import '../../../common/Components/Editor/EntryPointTree.css';
import { reduxFormFieldsType } from '../../../common/Components/types';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues's tructure
*/
export default class HistoryEntryPointConnectedDataFields extends PureComponent {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    ...reduxFormFieldsType,
    // from container mapStateToProps
    selectedDomainName: PropTypes.string,
    selectedTimelineId: PropTypes.string,
    selectedCatalogName: PropTypes.string,
    selectedItemName: PropTypes.string,
    selectedComObjectName: PropTypes.string,
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

  render() {
    const { windowId } = this.context;
    const {
      viewId,
      pageId,
      selectedDomainName,
      selectedTimelineId,
      selectedCatalogName,
      selectedItemName,
      allowedComObjects,
    } = this.props;

    const classForSdbValues = classnames('hidden');
    const classForTimeBasedValues = classnames('');

    return (
      <ErrorBoundary>
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

          <HorizontalFormGroup label="Data type" className="hidden">
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
              allowedComObjects={allowedComObjects}
            />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Provider" className={classForTimeBasedValues}>
            <ProviderFieldContainer />
          </HorizontalFormGroup>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}
