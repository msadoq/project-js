// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView EntryPoint's name.
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'rc-collapse';
import { Field, FieldArray } from 'redux-form';
import { entryPointType } from 'viewManager/common/Components/types';
import EntryPointConnectedDataFieldsContainer from 'viewManager/common/Components/Editor/EntryPointConnectedDataFieldsContainer';
import EntryPointUnit from 'viewManager/common/Components/Editor/EntryPointUnit';
// import { buildFormula } from 'viewManager/common'; // @todo uncomment
import StateColorsFields from 'viewManager/commonEditor/Fields/StateColorsFields';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import FiltersFieldsContainer from 'viewManager/commonEditor/Fields/FiltersFieldsContainer';

const { Panel } = Collapse;
const { string, arrayOf, oneOfType, func, bool } = PropTypes;
const emptyArray = [];
/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    entryPoint: entryPointType.isRequired,
    // From container mapStateToProps
    panels: oneOfType([
      arrayOf(string),
      bool,
    ]).isRequired,
    // From container mapDispatchToProps
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

  // /**
  //  * @param values
  //  */
  // handleSubmit = (values) => {
  //   const { entryPoint, updateEntryPoint, viewId } = this.props;
  //   updateEntryPoint(viewId, entryPoint.id, _defaultsDeep(
  //     values,
  //     entryPoint
  //   ));
  //   // updateEntryPoint(viewId, entryPoint.id, {
  //   //   ...entryPoint,
  //   //   ...values,
  //   //   connectedData: {
  //   //     ...values.connectedData,
  //   //     // formula: buildFormula( // @todo uncomment and remove formula field
  //   //     //   values.connectedData.catalog,
  //   //     //   values.connectedData.catalogItem,
  //   //     //   values.connectedData.comObject,
  //   //     //   values.connectedData.comObjectField
  //   //     // ),
  //   //   },
  //   // });
  // };

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
          {Array.isArray(panels) && panels.includes('name') &&
            <HorizontalFormGroup label="Label">
              <Field
                name="name"
                component={InputField}
                className="form-control input-sm"
                type="text"
              />
            </HorizontalFormGroup>
          }
        </Panel>
        <Panel
          key="ConnData"
          header="Connected data"
        >
          {Array.isArray(panels) && panels.includes('ConnData') &&
            <EntryPointConnectedDataFieldsContainer
              {...this.props}
            />
          }
        </Panel>
        <Panel
          key="Unit"
          header="Unit"
        >
          {Array.isArray(panels) && panels.includes('Unit') &&
            <EntryPointUnit
              {...this.props}
            />
          }
        </Panel>
        <Panel
          key="Filter"
          header="Filter"
        >
          {Array.isArray(panels) && panels.includes('Filter') &&
            <FieldArray
              name={'connectedData.filter'}
              component={FiltersFieldsContainer}
              {...this.props}
            />
          }
        </Panel>
        <Panel
          key="stateColors"
          header="State colors"
        >
          {Array.isArray(panels) && panels.includes('stateColors') &&
            <FieldArray
              name={'stateColors'}
              component={StateColorsFields}
              {...this.props}
            />
          }
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
