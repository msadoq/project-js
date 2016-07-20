import React, { Component, PropTypes } from 'react';
import { Row } from 'react-bootstrap';
import ViewContainer from '../containers/ViewContainer';

export default class Page extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.array.isRequired,
  };
  render() {
    return (
      <Row>
        {this.props.views.length
          ? ''
          : <div className="text-center mt20">nothing to show</div>}
        {this.props.views.map(viewId =>
          <ViewContainer key={`view-${viewId}`} viewId={viewId} />
        )}
      </Row>
    );
  }
}
