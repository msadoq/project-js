import React, { Component } from 'react';

export default class Help extends Component {
  render() {
    return (
      <div>
        <p
          style={{
            fontSize: '1.2em',
          }}
        >
          <br />
          <b>Wheel actions</b><br />
          <kbd>(ctrl/cmd) + wheel</kbd> Shrink / enlarge viewport.<br />
          <kbd>(ctrl/cmd) + alt + wheel</kbd> Move cursors together (homothety).<br />
        </p>
        <p
          style={{
            fontSize: '1.2em',
          }}
        >
          <br />
          <b>Timebar Shortcuts</b><br />
          <kbd>x</kbd> Move lower cursor on cursor position.<br />
          <kbd>c</kbd> Move ext lower cursor on cursor position.<br />
          <kbd>v</kbd> Move current cursor on cursor position.<br />
          <kbd>b</kbd> Move ext upper cursor on cursor position.<br />
          <kbd>n</kbd> Move upper cursor on cursor position.<br />
        </p>
        <p
          style={{
            fontSize: '1.2em',
          }}
        >
          <br />
          <b>Time navigation</b><br />
          Two ways to navigate through time:<br />
          - By dragging the visu window out of the viewport<br />
          - By dragging on the time scale (bellow the timebar)<br />
        </p>
      </div>
    );
  }
}
