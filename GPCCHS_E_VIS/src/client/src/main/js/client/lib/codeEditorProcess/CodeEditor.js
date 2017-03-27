import React, { PropTypes, PureComponent } from 'react';
import { SourceContainer } from './SourceContainer';

export default class CodeEditor extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string,
  }

  static defaultProps = {
    viewId: null,
  }
  componentDidMount() {
    document.getElementById('waitingRenderer').style.display = 'none';
  }
  render() {
    if (this.props.viewId === null) {
      return (
        <div>
          <span>No selected text view to edit</span>
        </div>
      );
    }
    return (<SourceContainer viewId={this.props.viewId} />);
  }
}
