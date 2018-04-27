// ====================================================================
// HISTORY
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  TextView common components to dedicated folder
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
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

  render() {
    const {
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
