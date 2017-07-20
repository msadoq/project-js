import React, { PropTypes, PureComponent } from 'react';
import { Glyphicon, Button, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Links.css';
// import { resolveFmdPath } from '../../common/pathResolver';

export default class Links extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleShowLinks: PropTypes.func.isRequired,
    removeLink: PropTypes.func.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    askOpenLink: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
  }
  static defaultProps = {
    links: [],
  }

  onClick = (linkId) => {
    this.props.askOpenLink(this.props.viewId, linkId);
    // Get link path
    // const path = this.props.links[key].path;
    // const resolvedPath = {};
    // resolve link: abs path, fmd path or OID
    // if (path.startsWith('/')) {
    //   resolveFmdPath(path, (err, resPath) => {
    //     if (!err) {
    //       resolvedPath.absolutePath = resPath.resolvedPath;
    //       this.openFile(resolvedPath);
    //     }
    //   });
    // } else {
    //   resolveOid(path, (err, resPath) => {
    //     if (!err) {
    //       resolvedPath.absolutePath = resPath.resolvedPath;
    //       this.openFile(resolvedPath);
    //     }
    //   });
    // }
  }

  // openFile = (resolvedPath) => {
  //   const { pages, views, focusPage, focusView, pageId, windowId, addMessage, askOpenLink }
  //     = this.props;
  //
  //   if (!resolvedPath.absolutePath) {
  //     addMessage('global', 'danger', 'Unable to open link');
  //     return;
  //   }
  //   const linkedPage = _find(pages, resolvedPath);
  //   // Link is a page already opened
  //   if (linkedPage) {
  //     if (linkedPage === pageId) {
  //       return;
  //     }
  //     // setFocus on the page linked
  //     focusPage(linkedPage.uuid);
  //     return;
  //   }
  //   const linkedView = _find(views, resolvedPath);
  //   // link is a view already opened
  //   if (linkedView) {
  //     // setFocus on the page which contains the view linked
  //     focusView(linkedView.uuid);
  //     return;
  //   }
  //   // Open the link
  //   askOpenLink(windowId, resolvedPath.absolutePath);
  // }

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
                <Button bsStyle="link" onClick={() => this.onClick(ikey)} >{link.name}</Button>
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
