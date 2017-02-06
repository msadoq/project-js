import React from 'react';
import {
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from '../ViewParamsContainer';

export default class DynamicTab extends React.Component {
  static contextTypes = {
    viewId: React.PropTypes.string,
  };
  state = {
    isTitleOpen: false,
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  render() {
    const { viewId } = this.context;

    return (
      <Panel>
        <ViewParamsContainer viewId={viewId} />
      </Panel>
    );
  }
}
