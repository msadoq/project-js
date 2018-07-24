/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Field, FieldArray } from 'redux-form';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
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
import DisplayModeField, {
  EXECUTE_AS_CODE_OPTION,
}
  from 'viewManager/commonEditor/Fields/DisplayModeField';
import styles from './EntryPointTree.css';
import { reduxFormFieldsType } from '../types';
import InputParameters from './InputParameters';
import Code from './Code';

const metadataType = PropTypes.shape({
  inputParameters: PropTypes.arrayOf(PropTypes.shape({
    itemName: PropTypes.string.isRequired,
    catalogName: PropTypes.string.isRequired,
  })),
  algorithm: PropTypes.string,
});

const ALGORITHM_FORM_PATH = 'connectedData.algorithm';
const ALGO_PARAMS_FORM_PATH = 'connectedData.algoParameters';

/*
  All the fields used in Connected data form
  It can be used with a prefix to map exactly form's initialValues'ss tructure
*/
export default class EntryPointConnectedDataFields extends PureComponent {
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
    selectedPath: PropTypes.string,
    selectedDisplayMode: PropTypes.string,
    metadata: metadataType,
    formMetadata: metadataType,
    // from EntryPointDetailsContainer.createForm
    changeFormValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedDomainName: null,
    selectedTimelineId: null,
    selectedCatalogName: null,
    selectedItemName: null,
    selectedComObjectName: null,
    selectedPath: null,
    selectedDisplayMode: null,
    metadata: null,
    formMetadata: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  state = {
    dataType: this.props.dataType,
  };

  componentDidMount() {
    this.getFormula();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.formMetadata && nextProps.metadata) {
      this.props.changeFormValue(ALGORITHM_FORM_PATH, nextProps.metadata.algorithm);
      this.props.changeFormValue(ALGO_PARAMS_FORM_PATH, nextProps.metadata.inputParameters);
    }
  }


  getFormula = () => {
    const {
      getFormula,
    } = this.props;
    if (this.fetchFormulaEnabled()) {
      getFormula();
    }
  };

  fetchFormulaEnabled = () => {
    const {
      selectedCatalogName,
      selectedDisplayMode,
    } = this.props;
    return !!(selectedCatalogName && selectedDisplayMode === EXECUTE_AS_CODE_OPTION.value);
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
      metadata,
    } = this.props;

    const classForSdbValues = classnames(dataType !== SDB_VALUE_OPTION.value && 'hidden');
    const classForTimeBasedValues = classnames(dataType !== TIME_BASED_DATA_OPTION.value && 'hidden');

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

          <HorizontalFormGroup label="Data type">
            <DataTypeField />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Path" className={classForSdbValues}>
            <PathField />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Display mode" className={classForSdbValues}>
            <DisplayModeField onChange={this.getFormula} enabled={this.fetchFormulaEnabled()} />
          </HorizontalFormGroup>

          <Code className={classForSdbValues} visible={!!metadata.algorithm}>
            <FieldArray name={ALGO_PARAMS_FORM_PATH} component={InputParameters} />
            <InputParameters params={metadata.inputParameters} className={classForSdbValues} />
            <Field
              component="textarea"
              name={ALGORITHM_FORM_PATH}
              className={styles.algorithm}
              rows="3"
              readOnly
            />
          </Code>

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
      </ErrorBoundary>
    );
  }
}
