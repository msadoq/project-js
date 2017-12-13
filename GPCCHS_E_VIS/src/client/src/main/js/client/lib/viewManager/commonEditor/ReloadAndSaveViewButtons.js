// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and Reload buttons beneath the title.
// VERSION : 1.1.2 : FA : ISIS-FT-1986 : 05/09/2017 : Editor top buttons: bsSize="tiny" -> bsSize="small"
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class ViewParams extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired,
    isSaved: PropTypes.bool.isRequired,
    askReloadView: PropTypes.func.isRequired,
    askSaveView: PropTypes.func.isRequired,
  }

  askReloadView = () => {
    this.props.askReloadView(this.props.viewId);
  }

  askSaveView = () => {
    this.props.askSaveView(this.props.viewId);
  }

  render() {
    const {
      isModified,
      isSaved,
    } = this.props;

    return (
      <div className="text-right">
        <ButtonGroup className="mt5 mb5 text-right">
          <Button
            bsStyle="primary"
            bsSize="small"
            type="submit"
            onClick={this.askReloadView}
            className="mr5"
            title="Reload view from document"
            disabled={!isSaved}
          >
            Reload
          </Button>
          <Button
            bsStyle="success"
            bsSize="small"
            type="submit"
            disabled={!isModified}
            onClick={this.askSaveView}
          >
            Save
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
