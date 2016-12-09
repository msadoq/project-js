import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Button,
  Glyphicon
} from 'react-bootstrap';
import PlotAxis from './PlotAxis';
import Modal from '../../../common/Modal';

export default class PlotAxes extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    axes: PropTypes.object.isRequired,
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
  }
  state = { isCreationModalOpen: false };

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

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

  handleSubmit = (key, values) => {
    const { updateAxis, viewId } = this.props;
    updateAxis(viewId, key, values);
  }

  openParentAccordion = (key, e) => {
    const {
      open,
      onSelect
    } = this.props;

    onSelect(key, e);
    open();
  }

  render() {
    const {
      axes,
      viewId,
      expanded,
      close,
      eventKey,
      headerRole,
      panelRole,
      collapsible
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
                onSelect={this.openPanel.bind(axisId)}
                onExited={this.closePanel.bind(axisId)}
              >
                {this.state[`isPanel${axisId}Open`] &&
                  <PlotAxis
                    key={axisId}
                    initialValues={axis}
                    onSubmit={this.handleSubmit.bind(this, axisId)}
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
