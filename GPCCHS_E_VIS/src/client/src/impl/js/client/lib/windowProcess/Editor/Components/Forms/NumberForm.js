import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';


export default class NumberForm extends React.Component {
  state = { value: 1 };

  changeValue = e => console.log(e.target.value);

  render() {
    return (
      <form>
        <FormGroup bsSize="small" className="no-margin-bottom">
          <FormControl type="number" value="1" />
        </FormGroup>
      </form>
    );
  }
}
