import React, { PropTypes, Component } from 'react';
import {
  Button,
  Glyphicon,
  Form,
} from 'react-bootstrap';
import classnames from 'classnames';
import Collapse from 'rc-collapse';
import _memoize from 'lodash/memoize';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import SelectButton from '../../../../windowProcess/commonReduxForm/SelectButton';
import AddPlotAxis from './AddPlotAxis';
import styles from './EntryPointTree.css';

const { Panel } = Collapse;
const alignButtons = [
  { label: '', icon: 'none' },
  { label: 'left', icon: 'alignLeft' },
  { label: 'right', icon: 'alignRight' },
];

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
          defaultActiveKey={panels}
        >
          {Object.keys(axes).map((axisId) => {
            const axis = axes[axisId];
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
                    initialValues={{
                      ...axis,
                      max: axis.max.toString(),
                      min: axis.min.toString(),
                      tickStep: axis.tickStep.toString(),
                    }}
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
