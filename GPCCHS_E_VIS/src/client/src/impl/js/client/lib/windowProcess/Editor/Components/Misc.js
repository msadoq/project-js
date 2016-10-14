import React from 'react';
import classNames from 'classnames';
import { Glyphicon, Collapse, Table } from 'react-bootstrap';
import styles from './Misc.css';


export default class Misc extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.miscContainer}>
        <a
          className={
            this.state.openL ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ openL: !this.state.openL })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.openL ? 'menu-down' : 'menu-right'}
          />
          &nbsp; Links
        </a>
        <Collapse in={this.state.openL}>
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
        </Collapse>
        <br />
        <a
          className={
            this.state.openP ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ openP: !this.state.openP })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.openP ? 'menu-down' : 'menu-right'}
          />
          &nbsp; Procedure launcher
        </a>
        <Collapse in={this.state.openP}>
          <div className={styles.shift}>
          </div>
        </Collapse>
      </div>
    );
  }
}
