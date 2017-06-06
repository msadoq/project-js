import React, { PropTypes, PureComponent } from 'react';
// import { Col, Form, Button, ControlLabel, Glyphicon, FormGroup } from 'react-bootstrap';
import { Glyphicon, Button, Col } from 'react-bootstrap';
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
  }
  static defaultProps = {
    links: [],
  }

  render() {
    const { links, show, removeLink } = this.props;
    let label = 'No link';
    if (links.length) {
      label = (show ? 'Hide links' : 'Show links');
    }

    return (
      <div className={styles.links}>
        <button
          onClick={this.props.toggleShowLinks}
          className="btn-primary"
        >
          {label}
        </button>
        {show &&
          links.map((link, key) =>
          (<div
            className={classnames(
              styles.link
            )}
            key={link.name.concat(key)}
          >
            <Col xs={6}>
              <Button bsStyle="link" >{link.name}</Button>
              <Glyphicon
                glyph="remove"
                onClick={e => removeLink(e, key)}
                className={
                  classnames(
                    styles.removeButton,
                    'text-danger'
                  )
                }
              />
            </Col>
          </div>)
          )
        }
      </div>
    );
  }
}
