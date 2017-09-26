// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 06/06/2017 : Fix links in mimic view
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : read link defined with absolute path, FMD path or OID
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : Fix path writing after choice
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix common/fmd, disable Links feature for now
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Fix lint error in View/Links .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean windowProcess View Links .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
import { Glyphicon, Button, Col, Row } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Links.css';

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
