import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

function createMarkup(content) {
  return { __html: content };
}

export default class TextView extends Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    entryPoints: PropTypes.array.isRequired,
    cData: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    links: PropTypes.array,
    defaultRatio: PropTypes.object,
    state: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };

  render() {
    if (!this.props.entryPoints || !this.props.entryPoints.length) {
      return <div>invalid configuration for text</div>; // TODO
    }
    const entryPointsText = _.map(this.props.entryPoints, ep => {
      const e = this.props.cData[ep.connectedData.uuid];
      return `entryPoint:${e.formula} <br />`;
    });
    return (
      <div>
        {this.props.type}
        <br />
        {entryPointsText}
        <br />
        <div dangerouslySetInnerHTML={createMarkup(this.props.content)} />
      </div>
    );
  }
}
