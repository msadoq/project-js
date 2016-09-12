import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import external from '../../external.modules';
import Unknow from './Unknown';

export default class View extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
  };
  render() {
    const { type, viewId, configuration } = this.props;

    console.log(external, type);
    const ViewTypeComponent = _.has(external, type) ? external[type] : Unknown;
    const component = <ViewTypeComponent {...this.props} />

    return (
      <div>
        <div>
          {this.props.title}
          <Button onClick={() => console.log('open', viewId)}>
            Edit this view
          </Button>
          <Button onClick={() => console.log('remove', viewId)}>
            Remove view
          </Button>
        </div>
        <div>
          {component}
        </div>
      </div>
    );
  }
}
