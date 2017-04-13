import React, { PropTypes } from 'react';
import { Glyphicon, FormGroup, InputGroup, FormControl, Button, Col } from 'react-bootstrap';

const { Addon } = InputGroup;

export default class EntryPointActions extends React.Component {
  static propTypes = {
    changeSearch: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
  }

  static contextTypes = {
    windowId: PropTypes.string,
  };

  searchName = e => this.props.changeSearch(e.target.value);

  willAddEntryPoint = (e) => {
    e.preventDefault();
    const {
      openModal,
      viewId,
    } = this.props;
    const {
      windowId,
    } = this.context;
    openModal(windowId, { type: 'addEntryPoint', viewId });
  }

  render() {
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
