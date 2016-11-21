import React, { PropTypes } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  InputGroup,
  Button,
  ControlLabel,
  Glyphicon
} from 'react-bootstrap';

import ColorPicker from './ColorPicker';
import SelectButton from './Buttons/SelectButton';
import SelectFontFamilySize from './Selects/SelectFontFamilySize';
import SelectFontStyle from './Selects/SelectFontStyle';

export default class ViewTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    onTitleChange: PropTypes.func.isRequired,
    onTitleStyleChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    title: '',
    titleStyle: {}
  }
  state = { title: this.props.title };

  handleTitle = ({ target: { value: title } }) => {
    this.setState({ title });
  }

  render() {
    const {
      titleStyle,
      onTitleChange,
      onTitleStyleChange
    } = this.props;
    const { title } = this.state;

    return (
      <div >
        <Form horizontal>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} >
              Title
            </Col>
            <Col xs={8}>
              <InputGroup>
                <FormControl
                  type="text"
                  className="input-sm"
                  value={title}
                  onChange={this.handleTitle}
                />
                <InputGroup.Button>
                  <Button
                    onClick={onTitleChange.bind(null, title)}
                    bsSize="small"
                  >
                    <Glyphicon glyph="ok" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>

            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} xs={4} >
              Font
            </Col>
            <Col xs={8}>
              <SelectFontFamilySize update={onTitleStyleChange} />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="formControlsSelect"
          >
            <Col componentClass={ControlLabel} xs={4}>
              Style
            </Col>
            <Col xs={8}>
              <SelectFontStyle
                update={onTitleStyleChange}
                bold={titleStyle.bold}
                italic={titleStyle.italic}
                underline={titleStyle.underline}
                strikeout={titleStyle.strikeOut}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="formControlsSelect"
          >
            <Col componentClass={ControlLabel} xs={4}>
              Color
            </Col>
            <Col xs={8}>
              <ColorPicker
                color={titleStyle.colour}
                onChange={onTitleStyleChange.bind(null, 'colour')}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="formControlsSelect"
          >
            <Col componentClass={ControlLabel} xs={4}>
              Align
            </Col>
            <Col xs={8} >
              <SelectButton
                size="xsmall"
                active={titleStyle.align}
                buttons={[
                  { label: 'left', icon: 'alignLeft' },
                  { label: 'center', icon: 'alignCenter' },
                  { label: 'right', icon: 'alignRight' }
                ]}
                onChange={onTitleStyleChange.bind(null, 'align')}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
