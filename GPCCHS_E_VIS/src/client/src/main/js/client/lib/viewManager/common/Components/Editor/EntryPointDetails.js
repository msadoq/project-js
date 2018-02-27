// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView EntryPoint's name.
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
import Collapse from 'rc-collapse';
import { entryPointType } from 'viewManager/common/Components/types';
import EntryPointConnectedDataFieldsContainer from 'viewManager/common/Components/Editor/EntryPointConnectedDataFieldsContainer';
import EntryPointUnitContainer from 'viewManager/common/Components/Editor/EntryPointUnitContainer';
import WithForm from 'viewManager/common/Hoc/WithForm';
import WithFormFieldArray from 'viewManager/common/Hoc/WithFormFieldArray';
// import { buildFormula } from 'viewManager/common'; // @todo uncomment
import AddEntryPoint from 'viewManager/common/Components/Editor/AddEntryPoint';
import StateColorsFields from 'viewManager/commonEditor/Fields/StateColorsFields';
import FiltersFields from 'viewManager/commonEditor/Fields/FiltersFields';

const { Panel } = Collapse;
const { string, arrayOf, oneOfType, func, bool } = PropTypes;
const emptyArray = [];
const EntryPointConnectedDataFieldsContainerWithForm =
  WithForm(EntryPointConnectedDataFieldsContainer);
const StateColorsFieldsWithForm = WithFormFieldArray(StateColorsFields, 'stateColors');
const EntryPointUnitWithForm = WithForm(EntryPointUnitContainer);
const EntryPointFilterWithForm = WithFormFieldArray(FiltersFields, 'connectedData.filter');

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    pageId: string.isRequired,
    entryPoint: entryPointType.isRequired,
    // From container mapStateToProps
    panels: oneOfType([
      arrayOf(string),
      bool,
    ]).isRequired,
    // From container mapDispatchToProps
    updateEntryPoint: func.isRequired,
    updateViewSubPanels: func.isRequired,
  };

  static defaultProps = {
    panels: [],
  };

  onChange = (openPanels) => {
    const {
      updateViewSubPanels,
      viewId,
      entryPoint,
    } = this.props;
    updateViewSubPanels(viewId, 'entryPoints', entryPoint.id, openPanels);
  };

  /**
   * @param values
   */
  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      ...values,
      connectedData: {
        ...values.connectedData,
        // formula: buildFormula( // @todo uncomment and remove formula field
        //   values.connectedData.catalog,
        //   values.connectedData.catalogItem,
        //   values.connectedData.comObject,
        //   values.connectedData.comObjectField
        // ),
      },
    });
  };

  /**
   * @param values
   */
  handleSubmitUnit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      connectedData: {
        ...entryPoint.connectedData,
        ...values.unit,
      },
    });
  };

  render() {
    const {
      entryPoint,
      viewId,
      pageId,
      panels,
    } = this.props;
    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={panels === true ? emptyArray : panels}
      >
        <Panel
          key="name"
          header="Name"
        >
          {Array.isArray(panels) && panels.includes('name') && <AddEntryPoint
            onSubmit={this.handleSubmit}
            form={`entrypoint-title-form-${entryPoint.id}-${viewId}`}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
            initialValues={{
              name: entryPoint.name,
            }}
          />}
        </Panel>
        <Panel
          key="ConnData"
          header="Connected data"
        >
          {Array.isArray(panels) && panels.includes('ConnData') && <EntryPointConnectedDataFieldsContainerWithForm
            form={`entrypoint-connectedData-form-${entryPoint.id}-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
            initialValues={entryPoint.connectedData}
            viewId={viewId}
            pageId={pageId}
          />}
        </Panel>
        <Panel
          key="Unit"
          header="Unit"
        >
          {Array.isArray(panels) && panels.includes('Unit') && <EntryPointUnitWithForm
            form={`entrypoint-unit-form-${entryPoint.id}-${viewId}`}
            onSubmit={values => this.handleSubmitUnit({ unit: values })}
            initialValues={units(entryPoint)}
            viewId={viewId}
            pageId={pageId}
            connectedData={entryPoint.connectedData}
          />}
        </Panel>
        <Panel
          key="Filter"
          header="Filter"
        >
          {Array.isArray(panels) && panels.includes('Filter') && <EntryPointFilterWithForm
            form={`entrypoint-filter-form-${entryPoint.id}-${viewId}`}
            onSubmit={values => this.handleSubmit(values)}
            initialValues={entryPoint}
            viewId={viewId}
            pageId={pageId}
          />}
        </Panel>
        <Panel
          key="stateColors"
          header="State colors"
        >
          {Array.isArray(panels) && panels.includes('stateColors') && <StateColorsFieldsWithForm
            initialValues={stateColor(entryPoint)}
            form={`entrypoint-stateColors-form-${entryPoint.id}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}

const stateColor = entryPoint => ({
  stateColors: entryPoint.stateColors || [],
});

const units = entryPoint => ({
  convertFrom: entryPoint.connectedData.convertFrom,
  convertTo: entryPoint.connectedData.convertTo,
});
