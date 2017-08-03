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
