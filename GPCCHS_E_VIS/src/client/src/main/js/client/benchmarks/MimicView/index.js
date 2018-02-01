// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 02/08/2017 : add mimic benchmark with isolated mimicView component
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import MimicView from '../../lib/viewManager/MimicView/Components/View/MimicView';
import { digitalDisplay, vgauge, hgauge, vslider, hslider } from './data';

process.title = 'MimicView benchmark';

const SET_MIMICVIEW_PROPS = 'SET_MIMICVIEW_PROPS';

const propsMimicView = {
  inspectorEpId: 'bbbb-bbbb',
  perfOutput: true,
  width: 1000,
  height: 1000,
};


const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MIMICVIEW_PROPS:
      return {
        ...state,
        mimicViewProps: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

/**
 * Request initialState asynchronously from main process
 */
const store = createStore(reducer, {});
const dispatch = store.dispatch;

const MimicViewWrapper = props =>
  (props.mimicViewProps ? <MimicView {...props.mimicViewProps} /> : <h4>No props</h4>);


MimicViewWrapper.propTypes = {
  mimicViewProps: PropTypes.shape(),
};
MimicViewWrapper.defaultProps = {
  mimicViewProps: null,
};

const MimicViewContainer = connect(
  state => ({ mimicViewProps: state.mimicViewProps }),
  {}
)(MimicViewWrapper);

const dispatchNewData = (data) => {
  dispatch(
    {
      type: SET_MIMICVIEW_PROPS,
      payload: {
        ...propsMimicView,
        data: { values: data.data },
        content: data.content,
        entryPoints: data.entryPoints,
      },
    }
  );
};

render(
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <h3 className="text-center">MimicView benchmark</h3>
      <br />
      <div className="row" style={{ height: '100%' }}>
        <div className="col-xs-9" style={{ height: '100%' }}>
          <MimicViewContainer />
        </div>
        <div className="col-xs-3" >
          <h4><strong>Digital display</strong></h4>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              const data = digitalDisplay(1);
              dispatchNewData(data);
            }}
          >1 EP</button> &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = digitalDisplay(10);
              dispatchNewData(data);
            }}
          >10 EP</button> &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = digitalDisplay(100);
              dispatchNewData(data);
            }}
          >100 EP</button> &nbsp;
          <br />
          <hr style={{ borderTop: '1px solid #666' }} />
          <h4><strong>VGauge</strong></h4>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              const data = vgauge(1);
              dispatchNewData(data);
            }}
          >1 EP</button> &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = vgauge(10);
              dispatchNewData(data);
            }}
          >10 EP</button> &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = vgauge(100);
              dispatchNewData(data);
            }}
          >100 EP</button> &nbsp;
          <br />
          <hr style={{ borderTop: '1px solid #666' }} />
          <h4><strong>HGauge</strong></h4>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              const data = hgauge(1);
              dispatchNewData(data);
            }}
          >1 EP</button> &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = hgauge(10);
              dispatchNewData(data);
            }}
          >10 EP</button> &nbsp;
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = hgauge(100);
              dispatchNewData(data);
            }}
          >100 EP</button> &nbsp;
          <br />
          <hr style={{ borderTop: '1px solid #666' }} />
          <h4><strong>VSlider</strong></h4>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              const data = vslider(1);
              dispatchNewData(data);
            }}
          >1 EP</button>
          <br />
          <hr style={{ borderTop: '1px solid #666' }} />
          <h4><strong>HSlider</strong></h4>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              const data = hslider(1);
              dispatchNewData(data);
            }}
          >1 EP</button>
          <br />
          <hr style={{ borderTop: '1px solid #666' }} />
        </div>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);
