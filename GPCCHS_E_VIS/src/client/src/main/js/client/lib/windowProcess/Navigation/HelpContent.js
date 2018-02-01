// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint Navigation/HelpContent component . .
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Add a F1 button in VIMA to open the docu wiki helper
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Change WikiHelper <a> in <button>
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : Help panel : removing view shortcuts that are not present anymore.
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import styles from './HelpContent.css';

const HelpContent = ({ openWikiHelper }) => (
  <div className={styles.help}>
    <Col xs={4}>
      <h2 className={styles.subTitle}>Timebar</h2>
      <p className={styles.para}>
        <br />
        <b>Wheel actions</b><br /><br />
        <kbd>(ctrl/cmd)</kbd> + <kbd>wheel</kbd> Shrink / enlarge viewport.<br />
        <kbd>(ctrl/cmd)</kbd> + <kbd>alt</kbd> + <kbd>wheel</kbd>&nbsp;
        Move cursors together (homothety).<br />
      </p>
      <p className={styles.para}>
        <br />
        <b>Timebar Shortcuts</b><br /><br />
        <kbd>w</kbd> Move current and all the other cursors on cursor position.<br />
        <kbd>x</kbd> Move lower cursor on cursor position.<br />
        <kbd>c</kbd> Move ext lower cursor on cursor position.<br />
        <kbd>v</kbd> Move current cursor on cursor position.<br />
        <kbd>b</kbd> Move ext upper cursor on cursor position.<br />
        <kbd>n</kbd> Move upper cursor on cursor position.<br />
      </p>
      <p className={styles.para}>
        <br />
        <b>Time navigation</b><br /><br />
        Two ways to navigate through time:<br />
        - By dragging the visu window out of the viewport.<br />
        - By dragging on the time scale (bellow the timebar).<br />
      </p>
    </Col>
    <Col xs={3} xsOffset={1}>
      <h2 className={styles.subTitle}>Wiki</h2>
      <button
        onClick={() => openWikiHelper()}
      >
        Open wiki helper
      </button>
    </Col>
  </div>
);
HelpContent.propTypes = {
  openWikiHelper: PropTypes.func.isRequired,
};

export default HelpContent;
