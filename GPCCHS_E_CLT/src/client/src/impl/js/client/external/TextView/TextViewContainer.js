import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getView } from '../../app/store/mutations/viewReducer';
import TextView from './TextView';
import { getConnectedDataFromState } from './main';


const TextViewContainer = props => <TextView {...props} />;

function mapStateToProps(state, { viewId, type }) {
  const { title, configuration } = getView(state, viewId);
  const entryPoints = _.get(configuration, 'textViewEntryPoints', []);
  const cData = getConnectedDataFromState(state, entryPoints);
  const links = _.get(configuration, 'links', []);
  const defaultRatio = _.get(configuration, 'defaultRatio', {});
  let start = 0;
  const contentArray = _.get(configuration, 'content');
  if (contentArray[0] === '<!DOCTYPE html>') {
    start = 1;
  }
  const content = _.join(_.slice(contentArray, start), '');
  // <div dangerouslySetInnerHTML={myFunction()} />
  return {
    viewId,
    type,
    title,
    entryPoints,
    cData,
    content,
    links,
    defaultRatio,
    state,
  };
}

export default connect(mapStateToProps)(TextViewContainer);
