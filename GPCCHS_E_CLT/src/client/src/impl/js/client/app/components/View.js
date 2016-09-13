import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Col, Button } from 'react-bootstrap';
import Unknown from '../window/View/Unknown';
import external from '../../external.modules';

export default class View extends Component {
  static propTypes = {
    type: React.PropTypes.oneOf(['plot', 'text', 'mimic']).isRequired,
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    unmountView: PropTypes.func,
  };
  render() {
    const { type, viewId } = this.props;

    if (!_.has(external, type)) {
      // TODO : handle unknown view placeholder
      throw new Error(`Unknown view type requested '${type}'`);
    }

    const ViewTypeComponent = _.has(external, type) ? external[type] : Unknown;
    const component = <ViewTypeComponent {...this.props} />

    return (
      <Col xs={12} className="p10">
        <h2>View {this.props.title}</h2>
        <Button onClick={() => this.props.openEditor()}>
          Edit this view
        </Button>
        <Button onClick={() => this.props.unmountView(viewId)}>
          Remove view
        </Button>
        <div>
          {component}
        </div>
      </Col>
    );
  }
}
