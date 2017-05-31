import React, { PropTypes, PureComponent } from 'react';
import { Col, Form, Button, ControlLabel, Glyphicon, FormGroup } from 'react-bootstrap';
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
          (<Form horizontal key={link.name.concat(key).concat('form')}>
            <FormGroup controlId={link.name.concat(key)} className={styles.link}>
              <Col componentClass={ControlLabel} sm={3} >
                {link.name}
              </Col>
              <Col sm={8}>
                <Button bsStyle="link" >{link.path}</Button>
              </Col>
              <Col sm={1}>
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
            </FormGroup>
          </Form>)
          )
        }
      </div>
    );
  }
}
