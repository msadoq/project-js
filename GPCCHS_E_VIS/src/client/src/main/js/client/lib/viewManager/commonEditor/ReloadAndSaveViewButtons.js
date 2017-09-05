import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class ViewParams extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired,
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
