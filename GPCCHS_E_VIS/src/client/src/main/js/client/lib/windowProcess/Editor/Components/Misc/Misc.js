import React from 'react';
import {
  Accordion,
  Panel,
  Glyphicon,
  Table
} from 'react-bootstrap';
import _memoize from 'lodash/memoize';

export default class Misc extends React.Component {
  state = {
    isPanelLinksOpen: false,
    isPanelProcedureOpen: false
  };

  openPanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: false }));

  render() {
    const { isPanelLinksOpen, isPanelProcedureOpen } = this.state;
    const tableStyle = { fontSize: '12px' };
    return (
      <Accordion>
        <Panel
          key={'Links'}
          header="Links"
          eventKey={'Links'}
          expanded={isPanelLinksOpen}
          onSelect={this.openPanel('Links')}
          onExited={this.closePanel('Links')}
        >
          {isPanelLinksOpen && <div>
            <Table condensed striped style={tableStyle}>
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
          onSelect={this.openPanel('Procedure')}
          onExited={this.closePanel('Procedure')}
        >
          {isPanelProcedureOpen && <div>
            To be defined
          </div>}
        </Panel>
      </Accordion>
    );
  }
}
