import React from 'react';
import {
  Accordion,
  Panel,
  Glyphicon,
  Table
} from 'react-bootstrap';

export default class Misc extends React.Component {
  state = {
    isPanelLinksOpen: false,
    isPanelProcedureOpen: false
  };

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  render() {
    const { isPanelLinksOpen, isPanelProcedureOpen } = this.state;

    return (
      <Accordion>
        <Panel
          key={'Links'}
          header="Links"
          eventKey={'Links'}
          expanded={isPanelLinksOpen}
          onSelect={this.openPanel.bind('Links')}
          onExited={this.closePanel.bind('Links')}
        >
          {isPanelLinksOpen && <div>
            <Table condensed striped style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Path</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Page01</td>
                  <td>../Page01.xml</td>
                  <td><Glyphicon glyph="trash" /></td>
                </tr>
                <tr>
                  <td>Page02</td>
                  <td>../Page02.xml</td>
                  <td><Glyphicon glyph="trash" /></td>
                </tr>
                <tr>
                  <td>Page03</td>
                  <td>../Page03.xml</td>
                  <td><Glyphicon glyph="trash" /></td>
                </tr>
              </tbody>
            </Table>
          </div>}
        </Panel>
        <Panel
          key={'Procedure'}
          header="Procedure launcher"
          eventKey={'Procedure'}
          expanded={isPanelProcedureOpen}
          onSelect={this.openPanel.bind('Procedure')}
          onExited={this.closePanel.bind('Procedure')}
        >
          {isPanelProcedureOpen && <div>
            To be defined
          </div>}
        </Panel>
      </Accordion>
    );
  }
}
