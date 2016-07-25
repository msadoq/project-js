import React from 'react';
import View from '../components/View';
import Mimic from '../components/Mimic';
import { connect } from 'react-redux';
import { updateContent } from '../actions/views';
import { openEditor } from '../actions/pages';

const ViewContainer = props => {
  if (props.type === 'mimic') {
    return <Mimic {...props} />;
  }

  // type==='standard'
  return <View {...props} />;
};

ViewContainer.propTypes = {
  type: React.PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const element = state.views[ownProps.viewId];
  return {
    viewIdId: ownProps.viewId,
    type: element.type,
    title: element.title,
    content: element.content,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateContent: content => dispatch(updateContent(ownProps.viewId, content)),
    openEditor: () => dispatch(openEditor(ownProps.pageId, ownProps.viewId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
