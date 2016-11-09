import React from 'react';
import { Form, FormGroup, FormControl, InputGroup, Button, Glyphicon } from 'react-bootstrap';
import styles from './AddEntryPoint.css';
/*
  A SUPPRIMER
*/
export default class AddEntryPoint extends React.Component {
  state = { name: '' };

  update = e => this.setState({ name: e.target.value });

  addPoint = () => {
    if (this.state.name !== '') {
      console.log(this.state.name);
    }
  }

  render() {
    const { name } = this.state;

    return (
      <Form inline className={styles.formAddPoint}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Button>
              <Button onClick={this.addPoint}>
                <Glyphicon glyph="plus" />
              </Button>
            </InputGroup.Button>
            <FormControl
              type="text"
              placeholder="Add entry point"
              onChange={this.update}
              value={name}
            />
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}
