import React from 'react';
import ReactDOM from 'react-dom';
import { Glyphicon,
         Collapse,
         Form,
         FormGroup,
         FormControl,
         Col,
         ControlLabel,
         InputGroup,
         Button
       } from 'react-bootstrap';
import EntryPointConnectedData from './EntryPointConnectedData';
import SelectButton from '../Buttons/SelectButton';
import styles from './EntryPointDetails.css';
import select from './Select.css';
import classNames from 'classnames';

export default class EntryPointDetails extends React.Component {
  static propTypes = {
    entryPoint: React.PropTypes.object
  }
  constructor(...args) {
    super(...args);
    this.state = {
      name: this.props.entryPoint.name,
      lineStyle: this.props.entryPoint.lineStyle,
      pointsStyle: this.props.entryPoint.pointsStyle,
      curveColor: this.props.entryPoint.curveColour
    };
    this.changeColor = this.changeColor.bind(this);
    this.openColorOptions = this.openColorOptions.bind(this);
  }
  componentDidMount() {
    const button = ReactDOM.findDOMNode(this.refs.showActiveColor);
    button.style.backgroundColor = this.state.curveColor;
  }
  openColorOptions(){
    console.log("ok");
    ReactDOM.findDOMNode(this.refs.selectColor).click();
  }
  changeColor(e) {
    ReactDOM.findDOMNode(this.refs.showActiveColor).style.backgroundColor = e.target.value;
  }
  update(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <div className={styles.EntryPointTreeFirstLvl}>
        <a
          className={
            this.state.open ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.open ? 'menu-down' : 'menu-right'}
          />
          &nbsp;{this.props.entryPoint.name}
        </a>
        <a className={styles.shift}>
          <Glyphicon className={styles.danger} glyph={this.state.open ? 'remove' : ''} />
        </a>
        <Collapse in={this.state.open}>
          <div className={styles.shift}>
            <div>
              <a
                className={
                  this.state.openG ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                onClick={() => this.setState({ openG: !this.state.openG })}
              >
                <Glyphicon
                  className={styles.glyphMenu}
                  glyph={this.state.openG ? 'menu-down' : 'menu-right'}
                /> General
              </a>
              <Collapse in={this.state.openG}>
                <div className={classNames(styles.shift, styles.mt5)}>
                  <Form horizontal>
                    <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                      <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Name
                      </Col>
                      <Col xs={9}>
                        <FormControl
                          controlId="name"
                          type="text"
                          className={styles.input_xsmall}
                          value={this.state.name}
                          onChange={this.update}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
                      <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Line
                      </Col>
                      <Col xs={9}>
                        <SelectButton
                          size="xsmall"
                          active={this.state.lineStyle}
                          buttons={['Continuous', 'Dashed', 'Dotted']}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup
                      className={styles.formGroupXsmall}
                      controlId="formHorizontalTimeline"
                    >
                      <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Points
                      </Col>
                      <Col xs={9}>
                        <SelectButton
                          size="xsmall"
                          active={this.state.pointsStyle}
                          buttons={['None', 'Triangle', 'Square', 'Dot']}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup
                      className={styles.formGroupXsmall}
                      controlId="formHorizontalTimeline"
                    >
                      <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Color
                      </Col>
                      <Col xs={9}>
                        <InputGroup>
                          <FormControl
                            defaultValue="#222222"
                            componentClass="select"
                            className={select.xsmall}
                            onChange={this.changeColor}
                            ref="selectColor"
                          >
                            <option value="#4169E1" className="colorOption">Blue</option>
                            <option value="#8B0000" className="colorOption">Red</option>
                            <option value="#6B8E23" className="colorOption">Green</option>
                            <option value="#FF8C00" className="colorOption">Orange</option>
                            <option value="#FFD700" className="colorOption">Yellow</option>
                            <option value="#9370DB" className="colorOption">Purple</option>
                            <option value="#8B4513" className="colorOption">Brown</option>
                            <option value="#7FFFD4" className="colorOption">Cyan</option>
                            <option value="#A9A9A9" className="colorOption">Grey</option>
                            <option value="#F08080" className="colorOption">Pink</option>
                            <option value="#222222" className="colorOption">Black</option>
                          </FormControl>
                          <InputGroup.Button>
                            <Button
                              ref="showActiveColor"
                              className={styles.buttonXsmall}
                              onClick={this.openColorOptions}
                            />
                          </InputGroup.Button>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                  </Form>
                </div>
              </Collapse>
            </div>
            <div>
              <a
                className={
                  this.state.openX ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                onClick={() => this.setState({ openX: !this.state.openX })}
              >
                <Glyphicon
                  className={styles.glyphMenu}
                  glyph={this.state.openX ? 'menu-down' : 'menu-right'}
                /> X Axis
              </a>
              <Collapse in={this.state.openX}>
                <div className={classNames(styles.shift, styles.mt5)}>
                  <EntryPointConnectedData connectedData={this.props.entryPoint.connectedDataX} />
                </div>
              </Collapse>
            </div>
            <div>
              <a
                className={
                  this.state.openY ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                onClick={() => this.setState({ openY: !this.state.openY })}
              >
                <Glyphicon
                  className={styles.glyphMenu}
                  glyph={this.state.openY ? 'menu-down' : 'menu-right'}
                /> Y Axis
              </a>
              <Collapse in={this.state.openY}>
                <div className={classNames(styles.shift, styles.mt5)}>
                  <EntryPointConnectedData connectedData={this.props.entryPoint.connectedDataY} />
                </div>
              </Collapse>
            </div>
            <div>
              <a
                className={
                  this.state.openST ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                onClick={() => this.setState({ openST: !this.state.openST })}
              >
                <Glyphicon
                  className={styles.glyphMenu}
                  glyph={this.state.openST ? 'menu-down' : 'menu-right'}
                /> State colours
              </a>
              <Collapse in={this.state.openST}>
                <div className={classNames(styles.shift, styles.mt5)}>
                  nothing
                </div>
              </Collapse>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
