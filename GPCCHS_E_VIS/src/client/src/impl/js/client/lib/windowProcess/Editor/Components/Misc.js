import React from 'react';
import classnames from 'classnames';
import { Glyphicon, Collapse, Table } from 'react-bootstrap';
import styles from './Misc.css';


export default class Misc extends React.Component {
  state = {
    openL: false,
    openP: false
  };

  toggleOpenL = () => this.setState({ openL: !this.state.openL });
  toggleOpenP = () => this.setState({ openP: !this.state.openP });

  render() {
    const { openL, openP } = this.state;

    return (
      <div className={styles.miscContainer}>
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openL })}
          onClick={this.toggleOpenL}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={openL ? 'menu-down' : 'menu-right'}
          />
          {' '} Links
        </button>
        {openL && <Collapse in={openL}>
          <div className={styles.shift}>
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
          </div>
        </Collapse>}
        <br />
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openP })}
          onClick={this.toggleOpenP}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={openP ? 'menu-down' : 'menu-right'}
          />
          {' '} Procedure launcher
        </button>
        {openP && <Collapse in={openP}>
          <div className={styles.shift} />
        </Collapse>}
      </div>
    );
  }
}
