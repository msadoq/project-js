// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Loading for code editor .
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// END-HISTORY
// ====================================================================

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
          <span>No selected view to edit</span>
        </div>
      );
    }
    return (<SourceContainer viewId={this.props.viewId} />);
  }
}
