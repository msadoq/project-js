import React from 'react';
import { Table, Glyphicon, Collapse } from 'react-bootstrap';
import ToggleButton from '../Buttons/ToggleButton';
import SelectButton from '../Buttons/SelectButton';
import NumberForm from '../Forms/NumberForm';

export default class Plots extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
      <Table condensed>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a
                className={this.state.open ? 'collapseEvent active' : 'collapseEvent'}
                onClick={() => this.setState({ open: !this.state.open })}
              >
                <Glyphicon glyph={this.state.open ? 'menu-down' : 'menu-right'} /> Grid
              </a>
            </td>
          </tr>
          <Collapse in={this.state.open}>
            <tr>
              <td colSpan="2">
                <Table condensed className="borderless">
                  <tbody>
                    <tr>
                      <td xs={3}>Show Grid</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          off={"OFF"}
                          default={"ON"}
                          toggled={this.state.toggle}
                          handleToggle={this.handleToggleShowGrid}
                        />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Line style</td>
                      <td>
                        <SelectButton buttons={['Continuous', 'Dashed', 'Dotted']} />
                      </td>
                    </tr>
                    <tr>
                      <td>Line width</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Reference Y axis</td>
                      <td>VBat</td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          </Collapse>
          <tr>
            <td>
              <a
                className={this.state.open1 ? 'collapseEvent active' : 'collapseEvent'}
                onClick={() => this.setState({ open1: !this.state.open1 })}
              >
                <Glyphicon glyph={this.state.open1 ? 'menu-down' : 'menu-right'} /> X Axis
              </a>
            </td>
          </tr>
          <Collapse in={this.state.open1}>
            <tr>
              <td colSpan="2">
                <Table condesed className="borderless">
                  <tbody>
                    <tr>
                      <td>Autoscale</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          ff={"OFF"}
                          default={"ON"}
                        />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Minimum</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr>
                      <td>Maximum</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Automatic graduations</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          off={"OFF"}
                          default={"ON"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Graduation distance</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Show axis</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          off={"OFF"}
                          default={"ON"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Unit</td>
                      <td>time</td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          </Collapse>
          <tr>
            <td>
              <a
                className={this.state.open2 ? 'collapseEvent active' : 'collapseEvent'}
                onClick={() => this.setState({ open2: !this.state.open2 })}
              >
                <Glyphicon glyph={this.state.open2 ? 'menu-down' : 'menu-right'} /> Y Axis
              </a>
            </td>
          </tr>
          <Collapse in={this.state.open2}>
            <tr>
              <td colSpan="2">
                <Table condensed className="borderless">
                  <tbody>
                    <tr>
                      <td>Autoscale</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          off={"OFF"}
                          default={"ON"}
                        />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Minimum</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr>
                      <td>Maximum</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Automatic graduations</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          off={"OFF"}
                          default={"ON"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Graduation distance</td>
                      <td>
                        <NumberForm />
                      </td>
                    </tr>
                    <tr className="odd">
                      <td>Show axis</td>
                      <td>
                        <ToggleButton
                          on={"ON"}
                          off={"OFF"}
                          default={"ON"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Unit</td>
                      <td>Vbat</td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          </Collapse>
          <tr>
            <td>
              <a
                className={this.state.open3 ? 'collapseEvent active' : 'collapseEvent'}
                onClick={() => this.setState({ open3: !this.state.open3 })}
              >
                <Glyphicon glyph={this.state.open3 ? 'menu-down' : 'menu-right'} /> Legend
              </a>
            </td>
          </tr>
          <Collapse in={this.state.open3}>
            <tr>
              <td colSpan="2">
                <Table condensed className="borderless">
                  <tbody>
                    <tr>
                      <td>Style</td>
                      <td></td>
                    </tr>
                    <tr className="odd">
                      <td>Location</td>
                      <td>
                        <SelectButton buttons={['Continuous', 'Dashed', 'Dotted']} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          </Collapse>
        </tbody>
      </Table>
    );
  }
}
