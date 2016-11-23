import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Button,
  Glyphicon
} from 'react-bootstrap';
import PlotAxis from './PlotAxis';

export default class PlotAxes extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    axes: PropTypes.array.isRequired,
    removeAxis: PropTypes.func.isRequired,
    updateAxis: PropTypes.func.isRequired
  }
  state = { };

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  handleRemovePlotAxis = (e, key) => {
    const { removeAxis, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeAxis(viewId, key);
  }

  handleSubmit = (key, values) => {
    const { updateAxis, viewId } = this.props;
    updateAxis(viewId, key, values);
  }

  render() {
    const {
      axes,
      viewId
    } = this.props;

    return (
      <Accordion>
        {axes.map((axis, key) =>
          <Panel
            key={key}
            header={<span>
              <Button
                bsSize="xsmall"
                className="pull-right btn-link"
                onClick={e => this.handleRemovePlotAxis(e, key)}
              >
                <Glyphicon
                  className="text-danger"
                  glyph="remove"
                  title="Remove"
                />
              </Button>
              {axis.label}
            </span>}
            eventKey={key}
            expanded={this.state[`isPanel${key}Open`]}
            onSelect={this.openPanel.bind(key)}
            onExited={this.closePanel.bind(key)}
          >
            {this.state[`isPanel${key}Open`] &&
              <PlotAxis
                key={key}
                initialValues={axis}
                onSubmit={this.handleSubmit.bind(this, key)}
                form={`axis-form-${key}-${viewId}`}
              />}
          </Panel>)}
      </Accordion>
    );
  }
}
