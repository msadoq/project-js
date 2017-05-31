import React, { PropTypes } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import Collapse from 'rc-collapse';
import styles from './Misc.css';
import AddLink from './AddLink';

const { Panel } = Collapse;

export default class Links extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    removeLink: PropTypes.func.isRequired,
    updateLink: PropTypes.func.isRequired,
    addLink: PropTypes.func.isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
  };

  onChange = (openPanels) => {
    const { updateViewSubPanels, viewId } = this.props;
    updateViewSubPanels(viewId, 'panels', 'links', openPanels);
  }

  handleRemoveLink = (e, key) => {
    const { removeLink, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeLink(viewId, key);
  }

  handleAddLink = (values) => {
    const { addLink, viewId } = this.props;
    addLink(viewId, values);
    this.closeCreationModal();
  }

  handleSubmitFactory = _memoize(key => values => this.handleSubmit(key, values));

  handleSubmit = (key, values) => {
    const { updateLink, viewId } = this.props;
    updateLink(viewId, key, values);
  }

  render() {
    const { links, panels, viewId } = this.props;
    const activeKeys = links.map(value => value.name);

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKeys={activeKeys}
      >
        {links.map((value, key) => (
          <Panel
            key={'link'.concat(`_${key}`)}
            header={
              <div className="rc-collapse-header-inner">
                <span className="">&nbsp;&nbsp;&nbsp;{value.name}</span>
                <div>
                  <Button
                    bsSize="xsmall"
                    className={classnames('btn-link', styles.removeButton)}
                    onClick={e => this.handleRemoveLink(e, key)}
                  >
                    <Glyphicon
                      className="text-danger"
                      glyph="remove"
                      title="Remove"
                    />
                  </Button>
                </div>
              </div>
            }
          >
            {Array.isArray(panels) && panels.includes('link'.concat(`_${key}`)) &&
              <AddLink
                key={'link'.concat(`_${key}`)}
                onSubmit={this.handleSubmitFactory(key)}
                form={`edit-link-${key}-${viewId}`}
                initialValues={value}
              />
          }
          </Panel>
          )
        ) }
      </Collapse>
    );
  }
}
