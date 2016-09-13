import React, { Component, PropTypes } from 'react';
import { Col, Button } from 'react-bootstrap';
import Plot from './View/Plot';
import Text from './View/Text';
import Mimic from './View/Mimic';
import Unknown from './View/Unknown';

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
    let component = null;
    if (type === 'plot') {
      component = <Plot {...this.props} />;
    } else if (type === 'text') {
      component = <Text {...this.props} />;
    } else if (type === 'mimic') {
      component = <Mimic {...this.props} />;
    } else {
      component = <Unknown {...this.props} />;
    }

    // TODO : inject geometry
    return (
      <Col xs={12} className="b m5 p10">
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
