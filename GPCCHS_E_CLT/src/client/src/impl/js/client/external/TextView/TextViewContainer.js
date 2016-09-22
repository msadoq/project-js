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
  const contentArray = _.get(configuration, 'content');

  let iStart = _.findIndex(contentArray, item => {
    return (item.search('<body') >= 0);
  });
  let iEnd = -1;
  if (iStart >= 0) {
    iEnd = _.findIndex(contentArray, item => {
      return (item.search('</body') >= 0);
    });
    if (iEnd < 0) {
      iEnd = contentArray.length;
    }
  } else {
    iStart = 0;
  }
  const content = _.join(_.slice(contentArray, iStart + 1, iEnd), '');

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
