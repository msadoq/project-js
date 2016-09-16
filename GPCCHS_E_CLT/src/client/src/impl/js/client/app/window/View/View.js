import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { getWebsocket } from '../websocket';
import { Button } from 'react-bootstrap';
import external from '../../../external.window';
import UnknownView from './UnknownView';

export default class View extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  componentDidMount() {
    console.log('send to websocket new view'); // TODO
    getWebsocket().write({
      event: 'viewOpen',
      payload: {
        type: this.props.type,
        viewId: this.props.viewId,
        configuration: this.props.configuration,
      },
    });
  }
  componentWillUnmount() {
    console.log('send to websocket close view'); // TODO
    getWebsocket().write({
      event: 'viewClose',
      payload: {
        type: this.props.type,
        viewId: this.props.viewId,
      },
    });
  }
  render() {
    const { type } = this.props;

    const ViewTypeContainer = _.has(external, type) ? external[type].container : UnknownView;

    return (
      <div>
        <div>
          {this.props.title}
          <Button onClick={this.onOpenEditor.bind(this)}>
            Edit this view
          </Button>
          <Button onClick={this.onRemove.bind(this)}>
            Remove view
          </Button>
        </div>
        <div>
          <ViewTypeContainer {...this.props} />
        </div>
      </div>
    );
  }
  onOpenEditor(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!this.props.openEditor) {
      return;
    }

    this.props.openEditor(
      this.props.viewId,
      this.props.type,
      this.props.configuration,
    );
  }
  onRemove(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!this.props.unmountAndRemove) {
      return;
    }

    this.props.unmountAndRemove(this.props.viewId);
  }
}
