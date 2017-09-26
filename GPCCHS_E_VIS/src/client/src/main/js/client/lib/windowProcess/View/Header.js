// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove an useless eslint-disable noparam-reassign
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Maj design : remove data & html buttons, add new open editor button
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : TEMP - TO RESET . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add Tooltip and use it in dropdown menu
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : REVERT Add Tooltip and use it in dropdown menu"
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Fix Tooltip when collapse and resize window
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add Tooltip and use it in dropdown menu
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : merge dev into work branch
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Save / Expand buttons on view, style review.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Collapsed view : SAVE here when isModified: true, bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : fix save view in contextual menu
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Clarify renderer/onSaveView controller . .
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : fix save view in contextual menu
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Collapsed view : SAVE here when isModified: true, bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : User can now show/hide/remove EP from Plot in legend.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : view title is bold when openned in editor. + other fixes.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : react-grid-layout handles are hidden when view is collapsed.
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : Fix saving view . .
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 27/06/2017 : Fix view saving . .
// VERSION : 1.1.2 : FA : #7217 : 07/07/2017 : Go back to previous mechanism to save a view + fix crash on minify view save
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Button, Glyphicon } from 'react-bootstrap';

import styles from './Header.css';
import { main } from '../ipc';

export default class Header extends PureComponent {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
      strikeOut: PropTypes.bool,
      align: PropTypes.string,
      color: PropTypes.string,
    }),
    viewId: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    isModified: PropTypes.bool.isRequired,
    collapseView: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    absolutePath: PropTypes.string.isRequired,
    oId: PropTypes.string.isRequired,
  };
  static defaultProps = {
    title: 'Untitled',
    titleStyle: {},
  };

  getTitleStyle() {
    const { titleStyle, isViewsEditorOpen } = this.props;
    const style = {
      fontFamily: titleStyle.font ? titleStyle.font : null,
      fontSize: titleStyle.size ? titleStyle.size : null,
      textAlign: titleStyle.align ? titleStyle.align : null,
      color: titleStyle.color ? titleStyle.color : null,
      background: titleStyle.bgColor ? titleStyle.bgColor : null,
      fontWeight: isViewsEditorOpen ? 'bold' : 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      paddingRight: '57px',
    };

    if (titleStyle.bold) {
      style.fontWeight = 'bold';
    }
    if (titleStyle.italic) {
      style.fontStyle = 'italic';
    }
    if (titleStyle.underline) {
      style.textDecoration = 'underline';
    } else if (titleStyle.strikeOut) {
      style.textDecoration = 'line-through';
    }
    return style;
  }

  expand = () => {
    const { collapseView, collapsed } = this.props;
    collapseView(!collapsed);
  }
  save = (e) => {
    if (e) e.preventDefault();
    const { viewId, absolutePath, oId } = this.props;
    const useSaveAs = (!absolutePath && !oId);
    main.saveView({ viewId, saveAs: useSaveAs }, () => {});
  }
  render() {
    const {
      isViewsEditorOpen,
      collapsed,
      isModified,
      onContextMenu,
    } = this.props;

    const title = `${this.props.title} ${isModified ? ' *' : ''}`;


    const titleStyle = this.getTitleStyle();

    return (
      <div
        className={classnames(styles.container, {
          [styles.containerActive]: isViewsEditorOpen,
        })}
      >
        <div
          style={titleStyle}
          className={`moveHandler ellipsis ${styles.title}`}
        >
          {title}{isViewsEditorOpen ? ' (in edition)' : ''}
        </div>
        <div className={styles.dropDownButtonContainer} >
          {!collapsed &&
            <button key={1} className={styles.expandButton} onClick={this.expand}>
              <Glyphicon glyph="minus" />
            </button>
          }
          {
            collapsed &&
            <button
              className={styles.expandButton}
              onClick={this.expand}
              title="Expand"
            >
              &#9633;
            </button>
          }
          <Button
            className={styles.expandButton}
            onClick={onContextMenu}
            title="Display Menu"
          >
            <Glyphicon glyph="align-justify" />
          </Button>
          {
            (collapsed && isModified) &&
            <button
              key={2}
              className={classnames(styles.expandButton, styles.saveButton)}
              onClick={this.save}
            >
              SAVE
            </button>
          }
        </div>
      </div>
    );
  }
}
