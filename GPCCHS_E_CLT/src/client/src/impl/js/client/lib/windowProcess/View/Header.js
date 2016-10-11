import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Glyphicon } from 'react-bootstrap';
import styles from './Header.css';

export default class ViewHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    isViewsEditorOpen: PropTypes.bool.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.onOpenEditor = this.onOpenEditor.bind(this);
    this.onCloseEditor = this.onCloseEditor.bind(this);
    this.onRemoveView = this.onRemoveView.bind(this);
  }
  render() {
    const { isViewsEditorOpen } = this.props;
    const title = _.get(this.props, ['configuration', 'title'], 'No title');
    return (
      <div>
        <ul className={styles.bar}>
          <li className={styles.item}>{title}</li>
          <li className={styles.item}>
            {isViewsEditorOpen
              ? <a onClick={this.onCloseEditor}>Close editor</a>
              : <a onClick={this.onOpenEditor}>Edit</a>
            }
          </li>
          <div className={styles.close}>
              <li>
                <a className={styles.right}>
                  <Glyphicon className="moveHandler" glyph="move" />
                </a>
                <a onClick={this.onRemoveView}>
                  <Glyphicon glyph="remove" />
                </a>
              </li>
          </div>
        </ul>
      </div>
    );
  }
  onOpenEditor(e) {
    e.preventDefault();
    if (!this.props.openEditor) {
      return;
    }

    this.props.openEditor(
      this.props.viewId,
      this.props.type,
      this.props.configuration,
    );
  }
  onCloseEditor(e) {
    e.preventDefault();
    if (!this.props.closeEditor) {
      return;
    }

    this.props.closeEditor();
  }
  onRemoveView(e) {
    e.preventDefault();
    if (!this.props.unmountAndRemove) {
      return;
    }

    this.props.unmountAndRemove(this.props.viewId);
  }
}
