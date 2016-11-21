import React, { PropTypes } from 'react';
import {
  Glyphicon,
  FormGroup,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';

export default class EntryPointName extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    handleName: PropTypes.func.isRequired,
  }

  state = { name: this.props.name };

  handleNameChange = ({ target: { value: name } }) => {
    this.setState({ name });
  }

  render() {
    const { name } = this.state;
    const { handleName } = this.props;

    return (
      <FormGroup>
        <InputGroup>
          <FormControl
            autoFocus
            type="text"
            className="input-sm"
            value={name}
            onChange={this.handleNameChange}
          />
          <InputGroup.Button>
            <Button
              onClick={handleName.bind(null, name)}
              bsSize="small"
            >
              <Glyphicon glyph="ok" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

/*

*/
