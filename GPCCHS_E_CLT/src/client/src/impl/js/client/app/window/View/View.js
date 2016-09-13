import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import external from '../../../external.modules';
import UnknownView from './UnknownView';

export default class View extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
  };
  render() {
    const { type, viewId } = this.props;

    const ViewTypeContainer = _.has(external, type) ? external[type].container : UnknownView;

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
          <ViewTypeContainer {...this.props} />
        </div>
      </div>
    );
  }
}
