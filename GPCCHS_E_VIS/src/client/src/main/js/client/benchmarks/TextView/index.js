import React, { PropTypes } from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import TextView from '../../lib/viewManager/TextView/Components/View/TextView';
import {
  data20Eps, data40Eps, data40EpsRandom, data100EpsRandom, data200EpsRandom,
  data200EpsRandomColors,
} from './data';

process.title = 'TextView benchmark';

const SET_TEXTVIEW_PROPS = 'SET_TEXTVIEW_PROPS';

const propsTextView = {
  viewId: 'aaaa-aaaa',
  addEntryPoint: () => null,
  updateContent: () => null,
  perfOutput: true,
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TEXTVIEW_PROPS:
      return {
        ...state,
        textViewProps: {
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
// const getState = store.dispatch;

const TextViewWrapper = props =>
  (props.textViewProps ? <TextView {...props.textViewProps} /> : <h4>No props</h4>);


TextViewWrapper.propTypes = {
  textViewProps: PropTypes.shape(),
};
TextViewWrapper.defaultProps = {
  textViewProps: null,
};

const TextViewContainer = connect(
  state => ({ textViewProps: state.textViewProps }),
  {}
)(TextViewWrapper);

render(
  <Provider store={store}>
    <div>
      <h3 className="text-center">TextView benchmark</h3>
      <br />
      <br />
      <div className="row">
        <div className="col-xs-9">
          <TextViewContainer />
        </div>
        <div className="col-xs-3" >
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = data20Eps();
              dispatch(
                {
                  type: SET_TEXTVIEW_PROPS,
                  payload: {
                    ...propsTextView,
                    data: { values: data.data },
                    content: data.content,
                    entryPoints: data.entryPoints,
                  },
                }
              );
            }}
          >Render with 20 entry points</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = data40Eps();
              dispatch(
                {
                  type: SET_TEXTVIEW_PROPS,
                  payload: {
                    ...propsTextView,
                    data: { values: data.data },
                    content: data.content,
                    entryPoints: data.entryPoints,
                  },
                }
              );
            }}
          >Render with 40 entry points</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = data40EpsRandom();
              dispatch(
                {
                  type: SET_TEXTVIEW_PROPS,
                  payload: {
                    ...propsTextView,
                    data: { values: data.data },
                    content: data.content,
                    entryPoints: data.entryPoints,
                  },
                }
              );
            }}
          >Render with 40 entry points w/ random values</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = data100EpsRandom();
              dispatch(
                {
                  type: SET_TEXTVIEW_PROPS,
                  payload: {
                    ...propsTextView,
                    data: { values: data.data },
                    content: data.content,
                    entryPoints: data.entryPoints,
                  },
                }
              );
            }}
          >Render with 100 entry points w/ random values</button>
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = data200EpsRandom();
              dispatch(
                {
                  type: SET_TEXTVIEW_PROPS,
                  payload: {
                    ...propsTextView,
                    data: { values: data.data },
                    content: data.content,
                    entryPoints: data.entryPoints,
                  },
                }
              );
            }}
          >Render with 200 entry points w/ random values</button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              const data = data200EpsRandomColors();
              dispatch(
                {
                  type: SET_TEXTVIEW_PROPS,
                  payload: {
                    ...propsTextView,
                    data: { values: data.data },
                    content: data.content,
                    entryPoints: data.entryPoints,
                  },
                }
              );
            }}
          >Render with 200 entry points w/ random values and colors</button>
        </div>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
);
