// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Prefer precise named import over .. from 'index.js' import.
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : PlotView: x axis is always time/s , not editable. Newly created Ep always stick to time axis or create one.
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Fix plot view drawing .
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Plot axis edition general revision. Fields min, max and tickStep are stored in store as float, float, int, but handled in ReduxForm as strings.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : Plot axes log settings stored in store and documents.
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6829 : 19/07/2017 : Fixed error when droping entrypoint in PlotView.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PropTypes, Component } from 'react';
import {
  Button,
  Glyphicon,
  Form,
} from 'react-bootstrap';
import classnames from 'classnames';
import Collapse from 'rc-collapse';
import _memoize from 'lodash/memoize';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import SelectButton from 'windowProcess/commonReduxForm/SelectButton';
import AddPlotAxis from './AddPlotAxis';
import styles from './EntryPointTree.css';

const { Panel } = Collapse;
const alignButtons = [
  { label: '', icon: 'none' },
  { label: 'left', icon: 'alignLeft' },
  { label: 'right', icon: 'alignRight' },
];
const emptyArray = [];

export default class PlotAxes extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    axes: PropTypes.objectOf(PropTypes.object),
    showYAxes: PropTypes.string,
    updateShowYAxes: PropTypes.func.isRequired,
    removeAxis: PropTypes.func.isRequired,
    updateAxis: PropTypes.func.isRequired,
    addAxis: PropTypes.func.isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    entryPoints: [],
    showYAxes: 'left',
    axes: {},
    panels: [],
  };

  onChange = (openPanels) => {
    const { updateViewSubPanels, viewId } = this.props;
    updateViewSubPanels(viewId, 'panels', 'axes', openPanels);
  }

  handleRemovePlotAxis = (e, key) => {
    const { removeAxis, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeAxis(viewId, key);
  }

  handleCreateAxis = (values) => {
    const { addAxis, viewId } = this.props;
    addAxis(viewId, values);
    this.closeCreationModal();
  }

  handleSubmit(key, values) {
    const { updateAxis, viewId } = this.props;
    updateAxis(
      viewId,
      key,
      {
        ...values,
        min: parseFloat(values.min),
        max: parseFloat(values.max),
        tickStep: parseInt(values.tickStep, 10),
        logSettings: {
          min: parseFloat(values.logSettings.min),
          max: parseFloat(values.logSettings.max),
          base: parseInt(values.logSettings.base, 10),
        },
      }
    );
  }

  handleSubmitFactory = _memoize(key => values => this.handleSubmit(key, values));

  handleShowYAxes = (value) => {
    const { updateShowYAxes, viewId } = this.props;
    updateShowYAxes(viewId, value);
  }

  render() {
    const {
      axes,
      showYAxes,
      viewId,
      entryPoints,
      panels,
    } = this.props;

    return (
      <div>
        {Object.keys(axes).length && <Form horizontal>
          <HorizontalFormGroup label="Align">
            <SelectButton
              active={showYAxes}
              onChange={this.handleShowYAxes}
              buttons={alignButtons}
            />
          </HorizontalFormGroup>
        </Form>}
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={panels === true ? emptyArray : panels}
        >
          {Object.keys(axes).map((axisId) => {
            const axis = axes[axisId];
            const addPlotAxisInitalValues = {
              ...axis,
              max: axis.max ? axis.max.toString() : null,
              min: axis.min ? axis.min.toString() : null,
              tickStep: axis.tickStep ? axis.tickStep.toString() : null,
              logSettings: {
                min: axis.logSettings.min ? axis.logSettings.min.toString() : null,
                max: axis.logSettings.max ? axis.logSettings.max.toString() : null,
                base: axis.logSettings.base ? axis.logSettings.base.toString() : null,
              },
            };
            return (
              <Panel
                key={axisId}
                header={
                  <div className="rc-collapse-header-inner">
                    <span className="">&nbsp;&nbsp;&nbsp;{axis.label}</span>
                    {axisId !== 'time' &&
                      <div>
                        <Button
                          bsSize="xsmall"
                          className={classnames(styles.removeButton, 'btn-link')}
                          onClick={e => this.handleRemovePlotAxis(e, axisId)}
                        >
                          <Glyphicon
                            className="text-danger"
                            glyph="remove"
                            title="Remove"
                          />
                        </Button>
                      </div>
                    }
                  </div>
                }
              >
                { Array.isArray(panels) && panels.includes(axisId) &&
                  <AddPlotAxis
                    key={axisId}
                    axisId={axisId}
                    initialValues={addPlotAxisInitalValues}
                    axes={axes}
                    entryPoints={entryPoints}
                    onSubmit={this.handleSubmitFactory(axisId)}
                    form={`edit-plot-axis-${axis.id}-${viewId}`}
                  />}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }
}
