// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Prefer precise named import over .. from 'index.js'
//  import.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2280 : 06/12/2017 : ergonomie plotView VIMA // l'utilisateur doit
//  pouvoir choisir avec ou sans ligne entre les points sans "tricher" en mettant Line size = 0
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ColorPickerField from 'windowProcess/commonReduxForm/ColorPickerField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import SelectButtonField from 'windowProcess/commonReduxForm/SelectButtonField';
import FormSectionPointStyle from 'viewManager/commonEditor/FormSections/FormSectionPointStyle';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';

const lineStyleButtons = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' },
];

class EntryPointParameters extends React.Component {
  static propTypes = {
    entryPoint: PropTypes.objectOf(PropTypes.shape).isRequired,
  };
  state = {
    isLineHidden: this.props.entryPoint.objectStyle.displayLine,
    isPointsHidden: this.props.entryPoint.objectStyle.displayPoints,
  };

  hangleToggleLine = () => {
    this.setState({ isLineHidden: !this.state.isLineHidden });
  }

  hangleTogglePoints = () => {
    this.setState({ isPointsHidden: !this.state.isPointsHidden });
  }

  render() {
    const {
      isLineHidden,
      isPointsHidden,
    } = this.state;
    return (
      <ErrorBoundary>
        <React.Fragment>
          <div className="page-header">
            <h4>Name</h4>
          </div>
          <HorizontalFormGroup label="Label">
            <Field
              name="name"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Color">
            <Field
              name="objectStyle.curveColor"
              component={ColorPickerField}
            />
          </HorizontalFormGroup>

          <div className="page-header">
            <h4>Line Style</h4>
          </div>
          <HorizontalFormGroup label="Visible">
            <Field
              name="objectStyle.displayLine"
              component={ButtonToggleField}
              textOn="YES"
              textOff="NO"
              styleOff="warning"
              onChange={this.hangleToggleLine}
            />
          </HorizontalFormGroup>
          {
            isLineHidden &&
            <HorizontalFormGroup label="Line style">
              <Field
                component={SelectButtonField}
                name="objectStyle.line.style"
                buttons={lineStyleButtons}
              />
            </HorizontalFormGroup>
          }
          {
            isLineHidden &&
            <HorizontalFormGroup label="Line size">
              <Field
                name="objectStyle.line.size"
                component={InputField}
                normalize={value => parseInt(value, 10)}
                className="form-control input-sm"
                type="number"
              />
            </HorizontalFormGroup>
          }

          <div className="page-header">
            <h4>Points Style</h4>
          </div>
          <HorizontalFormGroup label="Visible">
            <Field
              name="objectStyle.displayPoints"
              component={ButtonToggleField}
              textOn="YES"
              textOff="NO"
              styleOff="warning"
              onChange={this.hangleTogglePoints}
            />
          </HorizontalFormGroup>
          {
            isPointsHidden &&
            <HorizontalFormGroup label="Points">
              <FormSectionPointStyle name="objectStyle.points" />
            </HorizontalFormGroup>
          }
          {
            isPointsHidden &&
            <HorizontalFormGroup label="Points size">
              <Field
                name="objectStyle.points.size"
                component={InputField}
                normalize={value => parseInt(value, 10)}
                className="form-control input-sm"
                type="number"
              />
            </HorizontalFormGroup>
          }
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}

export default EntryPointParameters;
