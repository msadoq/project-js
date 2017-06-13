import React, { PropTypes, PureComponent } from 'react';
import { Glyphicon, Button, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import _find from 'lodash/find';
import globalConstants from 'common/constants';
import styles from './Links.css';
import { main } from '../ipc';

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
  }
  static defaultProps = {
    links: [],
    pages: {},
    views: {},
    showLinks: false,
  }
  onClick = (e, key) => {
    const { pages, views, focusPage, focusView, pageId, windowId } = this.props;
    // Get link path
    const path = this.props.links[key].path;
    const linkedPage = _find(pages, { absolutePath: path });
    // Link is a page already opened
    if (linkedPage) {
      if (linkedPage === pageId) {
        return;
      }
      // setFocus on the page linked
      focusPage(linkedPage.uuid);
      return;
    }
    const linkedView = _find(views, { absolutePath: path });
    // link is a view already opened
    if (linkedView) {
      // setFocus on the page which contains the view linked
      focusView(linkedView.uuid);
      return;
    }
    // Open the link
    main.message(globalConstants.IPC_METHOD_OPEN_PAGE_OR_VIEW, { windowId, absolutePath: path });
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
            links.map((link, key) =>
            (<div>
              <Col xs={6} key={link.name.concat(key)} className={classnames(styles.link)}>
                <Button bsStyle="link" onClick={e => this.onClick(e, key)} >{link.name}</Button>
                <Glyphicon
                  glyph="remove"
                  onClick={e => removeLink(e, key)}
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
