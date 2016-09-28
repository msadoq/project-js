import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { getWebsocket } from '../../websocket/windowWebsocket';
import { Button } from 'react-bootstrap';
import external from '../../../external.window';
import UnknownView from './UnknownView';
import ConnectedDataContainer from './ConnectedDataContainer';

export default class View extends Component {
  static propTypes = {
    timebarId: PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    interval: PropTypes.object.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);
    this.onStopGridLayoutPropagation = this.onStopGridLayoutPropagation.bind(this);
  }
  componentDidMount() {
    // TODO pass explicitly interesting configuration (for each connected data field, filter)
    getWebsocket().write({
      event: 'viewOpen',
      payload: {
        type: this.props.type,
        viewId: this.props.viewId,
        // configuration: this.props.configuration,
        // connectedData: this.props.connectedData,
      },
    });
  }
  componentWillUnmount() {
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
      <div onMouseDown={this.onStopGridLayoutPropagation}>
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
          <ConnectedDataContainer {...this.props} />
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
  onStopGridLayoutPropagation(e) {
    e.stopPropagation();
  }
}
