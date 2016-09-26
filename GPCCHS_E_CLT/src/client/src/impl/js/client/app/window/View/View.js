import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { getWebsocket } from '../../websocket/windowWebsocket';
import { Button, Glyphicon } from 'react-bootstrap';
import external from '../../../external.window';
import UnknownView from './UnknownView';

export default class View extends Component {
  static propTypes = {
    timebarId: PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    connectedData: PropTypes.array,
    lower: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    upper: PropTypes.number.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      connectedData: {},
    };

    this.onStopGridLayoutPropagation = this.onStopGridLayoutPropagation.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // An opportunity to react to a prop transition before render() is called by updating the state
    // using this.setState().
    // Calling this.setState() within this function will not trigger an additional render.
    this.queryMissingData(nextProps);
  }
  componentDidMount() {
    console.log('send to websocket new view');
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

    this.queryMissingData(this.props);
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
          {this.state.isLoading
            ? <Glyphicon glyph="repeat" />
            : <ViewTypeContainer
                timebarId={this.props.timebarId}
                viewId={this.props.viewId}
                type={this.props.type}
                configuration={this.props.configuration}
                connectedData={this.props.connectedData}
              />
          }

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
  queryMissingData(newProps) {
    console.log('queryMissingData', this.state.connectedData, newProps.connectedData);

    // TODO : chrono

    // MAYBE we can simplify by just detecting than visuWindow has changed!!!
    // if yes we compute below, if no, do nothing more

    // this.state
    // newProps[*].offset
    // this.props.lower
    // this.props.current
    // this.props.upper

    // TODO : compare newProps and state: determine connected data to remove and to add
    // (now we have the same list)
    // TODO : loop on each connected data
    //   - call view type method to determine expected interval
    //   - make diff between state interval (displayed or already required)
    //   - dataQuery missing interval

    /**
     * This state:
     *
     * {
     *   connectedData: {
     *     [localId]: { lower, current, upper },
     *   }
     * }
     */

    // unique key could be dataId

    // TODO : add for each the expected interval (apply offset, add clear comment to explain why master is offset 0 so nothing more to do)
    // console.log('------------------------------------------');
    // console.log(cds);
    // console.log(
    //   getTimebar(state, timebarId).visuWindow.lower,
    //   getTimebar(state, timebarId).visuWindow.current,
    //   getTimebar(state, timebarId).visuWindow.upper,
    // );
    // console.log(getMasterTimeline(state, timebarId));
    // console.log('------------------------------------------');

    // determine which new connected data is present

    // determine missing interval for each connectedData

    // make query to DC with { event: 'viewQuery', payload: {viewId, localId, dataId, interval} }
    _.each(newProps.connectedData, (cd) => {
      // console.log('request', this.props.viewId, cd.localId, cd.dataId, this.props.lower, this.props.upper);
      getWebsocket().write({
        event: 'viewOpen',
        payload: {
          type: this.props.type,
          viewId: this.props.viewId,
          localId: cd.localId,
          dataId: cd.dataId,
          interval: [this.props.lower, this.props.upper],
        },
      });
    });
  }
}
