import React, { PropTypes, PureComponent } from 'react';
import { Glyphicon, Button, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import _find from 'lodash/find';
import globalConstants from '../../constants';
import styles from './Links.css';
import { main } from '../ipc';
import { resolveFmdPath, resolveOid } from '../../common/pathResolver';

export default class Links extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleShowLinks: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    pages: PropTypes.shape({}),
    views: PropTypes.shape({}),
    pageId: PropTypes.string.isRequired,
    windowId: PropTypes.string.isRequired,
    focusPage: PropTypes.func.isRequired,
    focusView: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
  }
  static defaultProps = {
    links: [],
    pages: {},
    views: {},
    showLinks: false,
  }
  onClick = (e, key) => {
    // Get link path
    const path = this.props.links[key].path;
    const resolvedPath = {};
    // resolve link: abs path, fmd path or OID
    if (path.startsWith('/')) {
      resolveFmdPath(path, (err, resPath) => {
        if (!err) {
          resolvedPath.absolutePath = resPath.resolvedPath;
          this.openFile(resolvedPath);
        }
      });
    } else {
      resolveOid(path, (err, resPath) => {
        if (!err) {
          resolvedPath.absolutePath = resPath.resolvedPath;
          this.openFile(resolvedPath);
        }
      });
    }
  }

  openFile = (resolvedPath) => {
    const { pages, views, focusPage, focusView, pageId, windowId, addMessage } = this.props;

    if (!resolvedPath.absolutePath) {
      addMessage('global', 'danger', 'Unable to open link');
      return;
    }
    const linkedPage = _find(pages, resolvedPath);
    // Link is a page already opened
    if (linkedPage) {
      if (linkedPage === pageId) {
        return;
      }
      // setFocus on the page linked
      focusPage(linkedPage.uuid);
      return;
    }
    const linkedView = _find(views, resolvedPath);
    // link is a view already opened
    if (linkedView) {
      // setFocus on the page which contains the view linked
      focusView(linkedView.uuid);
      return;
    }
    // Open the link
    main.message(globalConstants.IPC_METHOD_OPEN_PAGE_OR_VIEW, { windowId, ...resolvedPath });
  }

  render() {
    const { links, show, removeLink } = this.props;
    if (!links.length) {
      return <div />;
    }

    const label = (show ? 'Hide links' : 'Show links');
    return (
      <div>
        <div className={styles.links}>
          <button
            onClick={this.props.toggleShowLinks}
            className="btn-primary"
          >
            {label}
          </button>
        </div>
        <Row>
          {show &&
            links.map((link, ikey) =>
            (<div key={'div'.concat(ikey)}>
              <Col xs={6} key={link.name.concat(ikey)} className={classnames(styles.link)}>
                <Button bsStyle="link" onClick={e => this.onClick(e, ikey)} >{link.name}</Button>
                <Glyphicon
                  glyph="remove"
                  onClick={e => removeLink(e, ikey)}
                  className={
                    classnames(
                      styles.removeButton,
                      'pull-right',
                      'text-danger'
                    )
                  }
                />
              </Col>
            </div>)
            )
          }
        </Row>
      </div>
    );
  }
}
