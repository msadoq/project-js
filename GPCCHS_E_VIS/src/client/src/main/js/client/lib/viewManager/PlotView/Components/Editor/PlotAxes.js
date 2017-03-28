import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Button,
  Glyphicon,
  Form,
} from 'react-bootstrap';
import _memoize from 'lodash/memoize';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import SelectButton from '../../../../windowProcess/commonReduxForm/SelectButton';
import PlotAxis from './PlotAxis';
import Modal from '../../../../windowProcess/common/Modal';

const alignButtons = [
  { label: '', icon: 'none' },
  { label: 'left', icon: 'alignLeft' },
  { label: 'right', icon: 'alignRight' },
];

export default class PlotAxes extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    axes: PropTypes.objectOf(PropTypes.object),
    showYAxes: PropTypes.string,
    updateShowYAxes: PropTypes.func.isRequired,
    removeAxis: PropTypes.func.isRequired,
    updateAxis: PropTypes.func.isRequired,
    addAxis: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    headerRole: PropTypes.string.isRequired,
    panelRole: PropTypes.string.isRequired,
    eventKey: PropTypes.string.isRequired,
    collapsible: PropTypes.bool.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    entryPoints: [],
    showYAxes: 'left',
    axes: {},
  };

  state = { isCreationModalOpen: false };

  openPanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: false }));

  handleRemovePlotAxis = (e, key) => {
    const { removeAxis, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeAxis(viewId, key);
  }

  handleAddPlotAxis = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.openCreationModal();
  }

  handleCreateAxis = (values) => {
    const { addAxis, viewId } = this.props;
    addAxis(viewId, values);
    this.closeCreationModal();
  }

  openCreationModal = () => this.setState({ isCreationModalOpen: true })
  closeCreationModal = () => this.setState({ isCreationModalOpen: false })

  handleSubmit(key, values) {
    const { updateAxis, viewId } = this.props;
    updateAxis(
      viewId,
      key,
      {
        ...values,
        min: parseFloat(values.min),
        max: parseFloat(values.max),
      }
    );
  }

  handleSubmitFactory = _memoize(key => values => this.handleSubmit(key, values));

  handleShowYAxes = (value) => {
    const { updateShowYAxes, viewId } = this.props;
    updateShowYAxes(viewId, value);
  }

  openParentAccordion = (key, e) => {
    const {
      open,
      onSelect,
    } = this.props;

    onSelect(key, e);
    open();
  }

  render() {
    const {
      axes,
      showYAxes,
      viewId,
      expanded,
      close,
      eventKey,
      headerRole,
      panelRole,
      collapsible,
      entryPoints,
    } = this.props;
    const { isCreationModalOpen } = this.state;

    return (
      <Panel
        header={<span>
          <span className="flex">Axes</span>
          <Button
            bsSize="xsmall"
            className="pull-right btn-link"
            onClick={this.handleAddPlotAxis}
          >
            <Glyphicon
              className="text-success"
              glyph="plus"
              title="Add"
            />
          </Button>
        </span>}
        onSelect={this.openParentAccordion}
        onExited={close}
        collapsible={collapsible}
        expanded={expanded}
        eventKey={eventKey}
        headerRole={headerRole}
        panelRole={panelRole}
      >
        {Object.keys(axes).length && <Form horizontal>
          <HorizontalFormGroup label="Align">
            <SelectButton
              active={showYAxes}
              onChange={this.handleShowYAxes}
              buttons={alignButtons}
            />
          </HorizontalFormGroup>
        </Form>}
        <Accordion>
          {Object.keys(axes).map((axisId) => {
            const axis = axes[axisId];
            return (
              <Panel
                key={axisId}
                header={<span>
                  <span className="flex">{axis.label}</span>
                  <Button
                    bsSize="xsmall"
                    className="btn-link"
                    onClick={e => this.handleRemovePlotAxis(e, axisId)}
                  >
                    <Glyphicon
                      className="text-danger"
                      glyph="remove"
                      title="Remove"
                    />
                  </Button>
                </span>}
                eventKey={axisId}
                expanded={this.state[`isPanel${axisId}Open`]}
                onSelect={this.openPanel(axisId)}
                onExited={this.closePanel(axisId)}
              >
                {this.state[`isPanel${axisId}Open`] &&
                  <PlotAxis
                    key={axisId}
                    axisId={axisId}
                    initialValues={axis}
                    entryPoints={entryPoints}
                    onSubmit={this.handleSubmitFactory(axisId)}
                    form={`axis-form-${axisId}-${viewId}`}
                  />}
              </Panel>
            );
          })}
        </Accordion>
        <Modal
          title="Add a new Axis"
          isOpened={isCreationModalOpen}
          onClose={this.closeCreationModal}
        >
          <PlotAxis
            onSubmit={this.handleCreateAxis}
            form="axis-form-new"
          />
        </Modal>
      </Panel>
    );
  }
}
