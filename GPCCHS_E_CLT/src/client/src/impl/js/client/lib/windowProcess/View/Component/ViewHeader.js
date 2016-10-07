import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import topbarStyles from './../View.css';


export default class ViewHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    onOpenEditor: PropTypes.func,
    onCloseEditor: PropTypes.func,
    onRemove: PropTypes.func
  };

  render() {
    return (<div>
      <ul className={topbarStyles.bar}>
        <li className={topbarStyles.item}>{this.props.title}</li>

        <li className={topbarStyles.item}>
          {this.props.isViewsEditorOpen
              ? <a onClick={this.props.onCloseEditor}>
                  Close editor
                </a>
              : <a onClick={this.props.onOpenEditor}>Edit</a>}
        </li>
        <div className={topbarStyles.close}>
            <li><a className={topbarStyles.right}><Glyphicon className="moveHandler" glyph="move" /></a><a onClick={this.props.onRemove}><Glyphicon glyph="remove" /></a></li>
        </div>
      </ul>
    </div>);
  }
}
