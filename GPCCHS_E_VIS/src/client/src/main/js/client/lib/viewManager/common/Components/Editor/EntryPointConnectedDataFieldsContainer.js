import { connect } from 'react-redux';
import EntryPointConnectedDataFields from 'viewManager/common/Components/Editor/EntryPointConnectedDataFields';
import { askItemMetadata } from 'store/actions/catalogs';
import {
  getSelectedCatalogName,
  getSelectedComObjectName,
  getSelectedDataType,
  getSelectedDomainInForm,
  getSelectedItemName,
  getSelectedTimelineId,
  getSelectedPath,
  getSelectedDisplayMode,
} from 'viewManager/commonEditor/Fields/selectors';


const mapStateToProps = (state, { form }) => ({
  selectedDomainName: getSelectedDomainInForm(form, state),
  selectedTimelineId: getSelectedTimelineId(form, state),
  selectedCatalogName: getSelectedCatalogName(form, state),
  selectedItemName: getSelectedItemName(form, state),
  selectedComObjectName: getSelectedComObjectName(form, state),
  dataType: getSelectedDataType(form, state),
  selectedPath: getSelectedPath(form, state),
  selectedDisplayMode: getSelectedDisplayMode(form, state),
});

const mapDispatchToProps = {
  getFormula: (viewId, pageId, domainName, timelineId, catalog, item) =>
    askItemMetadata(viewId, pageId, domainName, timelineId, catalog, item),
};

const EntryPointConnectedDataFieldsContainer =
  connect(mapStateToProps, mapDispatchToProps)(EntryPointConnectedDataFields);

export default EntryPointConnectedDataFieldsContainer;
