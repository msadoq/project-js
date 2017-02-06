import React, { PropTypes } from 'react';
import {
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from '../ViewParamsContainer';

export default class DynamicTab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    handleTextTitle: PropTypes.func,
    titleStyle: PropTypes.object,
    handleTextTitleStyle: PropTypes.func,
  }
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
