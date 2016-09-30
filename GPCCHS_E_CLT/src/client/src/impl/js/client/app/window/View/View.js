import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { getWebsocket } from '../../websocket/windowWebsocket';
import external from '../../../external.window';
import UnknownView from './UnknownView';
import ViewHeader from './Component/ViewHeader';
import ConnectedDataContainer from './ConnectedDataContainer';
import styles from '../Page/Page.css';

export default class View extends Component {
  static propTypes = {
    timebarId: PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    pageId: PropTypes.string,
    connectedData: PropTypes.array,
    interval: PropTypes.object.isRequired,
    openEditor: PropTypes.func,
    isViewsEditorOpen: PropTypes.bool,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
    onOpenEditor: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.onOpenEditor = this.onOpenEditor.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onCloseEditor = this.onCloseEditor.bind(this);
    this.onStopGridLayoutPropagation = this.onStopGridLayoutPropagation.bind(this);
  }
  componentDidMount() {
    // TODO pass explicitly interesting configuration (for each connected data field, filter)
    getWebsocket().write({
      event: 'viewOpen',
      payload: {
        type: this.props.type,
        viewId: this.props.viewId,
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
  onCloseEditor() {
    if (!this.props.closeEditor) {
      return;
    }
    this.props.closeEditor(this.props.pageId);
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
  render() {
    const { type } = this.props;

    const ViewTypeContainer = _.has(external, type) ? external[type].container : UnknownView;
    return (
      <div>
        <ViewHeader
          pageId={this.props.pageId}
          title={this.props.configuration.title}
          isViewsEditorOpen={this.props.isViewsEditorOpen}
          onOpenEditor={this.onOpenEditor}
          onCloseEditor={this.onCloseEditor}
          onRemove={this.onRemove}
        />
        <div className={styles.ViewTypeContainer}>
          <ViewTypeContainer
            timebarId={this.props.timebarId}
            viewId={this.props.viewId}
            type={this.props.type}
            configuration={this.props.configuration}
            connectedData={this.props.connectedData}
          />
        </div>
        <div className={styles.ConnectedDataContainer}>
            {/*<ConnectedDataContainer {...this.props} />*/}
        </div>
      </div>
    );
  }
}
