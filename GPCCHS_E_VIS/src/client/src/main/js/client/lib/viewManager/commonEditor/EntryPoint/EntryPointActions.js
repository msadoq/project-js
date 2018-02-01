// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView. Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y axis.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Glyphicon, FormGroup, InputGroup, FormControl, Button, Col } from 'react-bootstrap';

const { Addon } = InputGroup;

export default class EntryPointActions extends React.Component {
  static propTypes = {
    changeSearch: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    search: PropTypes.string,
  };

  static defaultProps = {
    search: '',
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  searchName = e => this.props.changeSearch(e.target.value);

  willAddEntryPoint = (e) => {
    e.preventDefault();
    const {
      openModal,
      viewId,
      viewType,
    } = this.props;
    const {
      windowId,
    } = this.context;
    openModal(windowId, { type: 'addEntryPoint', viewType, viewId });
  }

  render() {
    const { search } = this.props;

    return (
      <div>
        <FormGroup
          bsSize="sm"
          className="row"
        >
          <Col xs={8}>
            <InputGroup>
              <FormControl
                type="text"
                onChange={this.searchName}
                value={search}
              />
              <Addon>
                <Glyphicon glyph="search" />
              </Addon>
            </InputGroup>
          </Col>
          <Col xs={4} className="text-right">
            <Button
              bsSize="small"
              onClick={this.willAddEntryPoint}
              title="Add entry point"
            >
              <Glyphicon glyph="plus" />
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}
