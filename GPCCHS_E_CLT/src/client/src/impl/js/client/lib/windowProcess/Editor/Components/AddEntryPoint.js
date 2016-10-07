import React from 'react';
import { Form, FormGroup, FormControl, InputGroup, Button, Glyphicon } from 'react-bootstrap';
import styles from './AddEntryPoint.css';
/*
  A SUPPRIMER
*/
export default class AddEntryPoint extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { name: '' };
  }
  update(e) {
    this.setState({ name: e.target.value });
  }
  addPoint() {
    if (this.state.name !== '') {
      console.log(this.state.name);
    }
  }
  render() {
    return (
      <Form inline className={styles.formAddPoint}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Button>
              <Button onClick={this.addPoint.bind(this)}>
                <Glyphicon glyph="plus" />
              </Button>
            </InputGroup.Button>
            <FormControl
              type="text"
              ref="addPointForm"
              placeholder="Add entry point"
              onChange={this.update.bind(this)}
              value={this.state.name}
            />
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}
